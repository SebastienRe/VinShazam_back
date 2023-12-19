const express = require('express');
const shazamVin_usersRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const urlMongodb = 'mongodb://mongo:27017';
const dbName = 'shazamVin';
const collectionName = 'users';
const modelVin = require('../models/utilisateur.js');
const UTILISATEUR = "/users";

shazamVin_usersRouter.get(UTILISATEUR, (req, res) => {
        
        mongodbPromise = mongodb.connect(urlMongodb);
    
        mongodbPromise.then((client) => {
            if(!client) {
                console.error('Error connecting to MongoDB:', err);
                return;
            }
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            
            collection.find({}).toArray((err, docs) => {
                if (err) {
                    console.error('Error getting documents from MongoDB:', err);
                    return;
                }
               
                console.log("les docs : " + JSON.stringify(docs));
                res.json(docs);
            });
        });
});

shazamVin_usersRouter.get(UTILISATEUR + "/user/:id", (req, res) => {
    const id = req.params.id;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise.then((client) => {
        if(!client) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.findOne({id: id}, (err, doc) => {
            if (err) {
                console.error('Error getting documents from MongoDB:', err);
                return;
            }
            res.json(doc);
        });
    });
});

shazamVin_usersRouter.post(UTILISATEUR + "/addUser", (req, res) => {
    const user = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise.then((client) => {
        if(!client) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.insertOne(user, (err, result) => {
            if (err) {
                console.error('Error inserting document into MongoDB:', err);
                return;
            }
            console.log("le doc : " + JSON.stringify(result));
            res.json(result);
        });
    });
});

shazamVin_usersRouter.post(UTILISATEUR + "/connexion", (req, res) => {
    const user = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise.then((client) => {
        if(!client) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.findOne({email: user.email, password: user.password}, (err, doc) => {
            if (err) {
                console.error('Error getting documents from MongoDB:', err);
                res.json(null);
                return;
            }
            res.json(doc);
        });
    });
});

//inscrire un utilisateur
shazamVin_usersRouter.post(UTILISATEUR + "/inscription", (req, res) => {
    const user = req.body;
    mongodbPromise = mongodb.connect(urlMongodb);

    mongodbPromise.then((client) => {
        if(!client) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.findOne({email: user.email}, (err, doc) => {
            if (err) {
                console.error('Error getting documents from MongoDB:', err);
                res.json(null);
                return;
            }
            if(doc){
                res.json(null);
            }else{
                collection.insertOne(user, (err, result) => {
                    if (err) {
                        console.error('Error inserting document into MongoDB:', err);
                        return;
                    }
                    console.log("le doc : " + JSON.stringify(result));
                    res.json(result);
                });
            }
        });
    });
});
module.exports = {shazamVin_usersRouter};