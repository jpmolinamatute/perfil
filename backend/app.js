const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const dbName = 'connections';
const dbURL = `mongodb://meteor:dev@naruto:57017/${dbName}`;

async function perfillist(req, res) {
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true });
        const db = client.db(dbName);
        const collection = db.collection('perfil');
        const data = await collection.find().sort({ _id: 1 }).toArray();
        client.close();
        res.send(data);
    } catch (e) {
        res.send(e);
    }
}

async function materiallist(req, res) {
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true });
        const db = client.db(dbName);
        const collection = db.collection('materials');
        const data = await collection.find().sort({ _id: 1 }).toArray();
        client.close();
        res.send(data);
    } catch (e) {
        res.send(e);
    }
}

// Middleware for CORS
app.use(cors());

// Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Invalid page');
});


app.get('/api/perfillist', perfillist);
app.get('/api/materiallist', materiallist);

app.listen(port, () => {
    console.info(`Starting the server at port ${port}`);
});
