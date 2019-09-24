require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

// function to connect to Mongo Database
async function connectToDb() {
    const URL = process.env.DB_URL || 'mongodb://localhost/issuetracker'; // 127.0.0.1:27017
    console.log('URL: ', URL.toString());
    const client = new MongoClient(URL, { useNewUrlParser: true });
    await client.connect().then(() => {
        console.log('Connected to MongoDB at', URL);
    }).catch((error) => {
        console.log('>>Connection to MongoDB error: ', error);
    });
    db = client.db();
}

async function getNextSequence(name) {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnOriginal: false },
    );
    return result.value.current;
}

function getDb() {
    return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
