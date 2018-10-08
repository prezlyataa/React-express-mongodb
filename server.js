const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Person = require('./models/person');

const app = express();

const PORT = 5000;
const SERVER = '127.0.0.1:27017';
const DB = 'simple-app';
const MONGODB_URI = `mongodb://${SERVER}/${DB}`;
const connection = mongoose.connection;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

connection.on('connected', () => console.log('Connected to database'));
connection.on('error', () => console.log('Connection failed with - ', err));

app.use(bodyParser.json(), cors());

app.get('/express', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/persons', (req, res) => {
    // Person.find()
    //     .then(data => {
    //         res.status(200).send({ persons: data })
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: err.message })
    //     })
    connection.db.collection('persons', (err, collection) => {
        collection.find({})
            .toArray((err, data) => {
                res.status(200).send(data)
            })
    });
});

app.listen(PORT, () => console.log(`Server listenisng on port: ${PORT}`));