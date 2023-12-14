// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// Connection URL
const url = 'mongodb://mongo:27017'; // Utilisation du nom du service Docker
const dbName = 'shazamVin';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // Define your routes and handle your requests here

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


