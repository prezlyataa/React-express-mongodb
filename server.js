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

// app.get('/persons', (req, res) => {
//     Person.find({})
//         .then(data => {
//             res.status(200).send(data)
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message })
//         })
//     // connection.db.collection('persons', (err, collection) => {
//     //     collection.find({})
//     //         .toArray((err, data) => {
//     //             res.status(200).send(data)
//     //         })
//     // });
// });

app.get('/persons', (req, res, next) => {
    Person.find((err, persons) => {
        if (err) return next(err);
        res.json(persons);
    });
});

app.post('/persons', (req, res, next) => {
    Person.create(req.body, (err, person) => {
        if (err) return next(err);
        res.json(person);
    });
});

// app.get(`persons/:id`, (req, res, next) => {
//     Person.findById(req.params.id, (err, person) => {
//         if (err) return next(err);
//         res.json(person);
//     });
// });

app.listen(PORT, () => console.log(`Server listenisng on port: ${PORT}`));