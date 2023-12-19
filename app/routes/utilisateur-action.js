const express = require('express');
const shazamVin_usersRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const urlMongodb = 'mongodb://mongo:27017';
const dbName = 'shazamVin';
const collectionName = 'users';
const UTILISATEUR = "/users";

shazamVin_usersRouter.get(UTILISATEUR, (req, res) => {
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
               
                console.log("les docs : " + JSON.stringify(docs));
                res.json(docs);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


shazamVin_usersRouter.get(UTILISATEUR + "/user/:id", (req, res) => {
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

            collection.findOne({ id: id }, (err, doc) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.json(doc);
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});



shazamVin_usersRouter.post(UTILISATEUR + "/connexion", (req, res) => {
    const user = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);
    mongodbPromise.then((client) => {
        if (!client) {
            const err = new Error('Error connecting to MongoDB');
            throw err;
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.findOne({ identifiant: user.identifiant, motDePasse: user.motDePasse }, (err, doc) => {
            if (err) {
                console.error('Error getting documents from MongoDB:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (!doc) {
                res.json(null);
                return;
            }

            res.json(doc);
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

//inscrire un utilisateur
shazamVin_usersRouter.post(UTILISATEUR + "/inscription", (req, res) => {
    const user = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise
        .then((client) => {
            if (!client) {
                const err = new Error('Error connecting to MongoDB');
                throw err;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.findOne({ identifiant: user.identifiant }, (err, doc) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                if (doc) {
                    res.json(null);
                } else {
                    collection.insertOne(user, (err, result) => {
                        if (err) {
                            console.error('Error inserting document into MongoDB:', err);
                            res.status(500).json({ error: 'Internal Server Error' });
                            return;
                        }
                        console.log("le doc : " + JSON.stringify(result));
                        res.json(result);
                    });
                }
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = {shazamVin_usersRouter};