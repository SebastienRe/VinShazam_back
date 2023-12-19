// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
const vinsRoutes = require('./routes/vin-action.js');
const usersRoutes = require('./routes/utilisateur-action.js');


// Define your routes and handle your requests here

app.use(vinsRoutes.shazamVin_vinsRouter);
app.use(usersRoutes.shazamVin_usersRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//mongoimport --db shazamVin --collection vins --file /data/testVin.json --jsonArray
