const express = require('express');
const shazamVin_vinsRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const urlMongodb = 'mongodb://mongo:27017';
const dbName = 'shazamVin';
const collectionName = 'vins';
const VIN = "/vins";

shazamVin_vinsRouter.get(VIN, (req, res) => {
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.find({}).toArray((err, docs) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("nombre de vins : " + docs.length);
                res.json(docs);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

shazamVin_vinsRouter.get(VIN + "/vin/:id", (req, res) => {
    const id = req.params.id;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.findOne({ _id: ObjectId(id) }, (err, doc) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("le doc : " + JSON.stringify(doc));
                res.json(doc);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

shazamVin_vinsRouter.post(VIN + '/addVin', (req, res) => {
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            const vin = req.body;
            collection.insertOne(vin, (err, result) => {
                if (err) {
                    console.error('Error inserting document into MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("result : " + JSON.stringify(result));
                res.json(result);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

shazamVin_vinsRouter.put(VIN + '/addComment/:id', (req, res) => {
    console.log("addComment");
    const id = req.params.id;
    console.log("id : " + id);
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then(async (client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const comment = req.body;
            console.log("comment : " + JSON.stringify(comment));

            
            await new Promise((resolve, reject) => {
                collection.updateOne({ _id: ObjectId(id) }, { $push: { comments: comment } }, (err, result) => {
                    if (err) {
                        console.error('Error updating document into MongoDB:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        reject(err);
                    }
                    console.log("result : " + JSON.stringify(result));
                    resolve();
                });
            });
            
            // on the collection comments = []
            let comments;
            await new Promise((resolve, reject) => {
                collection.findOne({ _id: ObjectId(id) }, (err, doc) => {
                    if (err) {
                        console.error('Error getting documents from MongoDB:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        reject(err);
                    }
                    console.log("le doc : " + JSON.stringify(doc));
                    comments = doc.comments;
                    resolve();
                });
            });
            console.log("comments : " + JSON.stringify(comments));

            const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0); 
            const averageNote = totalNotes / comments.length;

            //update the average note
            await new Promise((resolve, reject) => {
                collection.updateOne({ _id: ObjectId(id) }, { $set: { note: averageNote } }, (err, result) => {
                    if (err) {
                        console.error('Error updating document into MongoDB:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        reject(err);
                    }
                    console.log("result : " + JSON.stringify(result));
                    resolve();
                });
            });

            res.json({success: true});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

shazamVin_vinsRouter.put(VIN + '/updateVin/:id', (req, res) => {
    console.log("updateVin");
    const id = req.params.id;
    body = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            const vin = req.body;
            delete vin._id;
            delete vin.comments;
            vin.misAjourLe = new Date().toISOString().slice(0, 16).replace('T', ' ');

            collection.updateOne({ _id: ObjectId(id) }, { $set: vin }, (err, result) => {
                if (err) {
                    console.error('Error updating document into MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("result : " + JSON.stringify(result));
                res.json(result);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


shazamVin_vinsRouter.delete(VIN + '/deleteVin/:id', (req, res) => {
    const id = req.params.id;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.deleteOne({ id: id }, (err, result) => {
                if (err) {
                    console.error('Error deleting document into MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("result : " + JSON.stringify(result));
                res.json(result);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


shazamVin_vinsRouter.post(VIN + '/searchVin', (req, res) => {
     

    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            collection.find({}).toArray((err, docs) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log("nombre de vins : " + docs.length);
                const index = Math.floor(Math.random() * docs.length);
                console.log("index : " + index);
                res.json(docs[index]);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

//exporter les routes
module.exports = {shazamVin_vinsRouter};
