const { MongoClient } = require('mongodb');

const URL = process.env.DB_URL || 'mongodb://localhost/issuetracker'; // 127.0.0.1:27017
// const port = process.env.API_SERVER_PORT || 3000;
require('dotenv').config({ path: '../../sample.env' });
// { path: __dirname+'/sample.env' }

function testWitCallbacks(callback) {
    console.log('\n--- testWitCallbacks ---');

    const client = new MongoClient(URL, { useNewUrlParser: true });
    client.connect((err) => {
        if (err) {
            callback(err);
            return;
        }
        console.log('Connected to MongoDB URL', URL);
        const db = client.db();
        const collection = db.collection('employees');

        const employee = { id: 1, name: { first: 'A.', last: 'Callback' }, age: 23 };
        collection.insertOne(employee, (err2, result) => {
            if (err2) {
                client.close();
                callback(err2);
                return;
            }
            console.log('Result of insert:\n', result.insertedId);

            collection.find({ _id: result.insertedId })
                .toArray((err3, docs) => {
                    if (err3) {
                        client.close();
                        callback(err3);
                        return;
                    }
                    console.log('Result of find:\n', docs);
                    client.close();
                    callback(err);
                });
        });
    });
}

async function testWithAsync() {
    console.log('\n--- testWithAsync ---');
    const client = new MongoClient(URL, { useNewUrlParser: true });

    try {
        await client.connect();

        console.log('Connected to MongoDB URL', URL);
        const db = client.db();
        const collection = db.collection('employees');

        const employee = [
            { id: 1, name: { first: 'A.', last: 'Callback' }, age: 23 },
            { id: 2, name: { first: 'B.', last: 'Async' }, age: 23 },
        ];

        const result = await collection.insertMany(employee);

        console.log('Result of insert:\n', JSON.stringify(result));

        const docs = await collection.find({})
            .toArray();

        docs.forEach((doc) => {
            console.log('Result of find:\n', doc);
        });
    } catch (e) {
        console.log('Error:', e);
    } finally {
        client.close();
    }
}

testWitCallbacks((err) => {
    if (err) {
        console.log(err);
    }
    testWithAsync();
});

// testWithAsync();

/**
 * execute mongo shell using the --eval command line option
 * $mongo issuetracker --eval "db.employees.remove({})"
 *
 * the execute script
 * $node trymongo.js
 *
 * */
