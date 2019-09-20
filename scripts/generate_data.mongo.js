/* global db print */
/* eslint no-restricted-globals: "off" */

// db.issues.remove({});
// db.deleted_issues.remove({});

const owners = ['Rave', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

const initialCount = db.issues.count();

for (let i = 0; i < 100; i += 1) {
    const randomeCreatedDate = (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
    const created = new Date(randomeCreatedDate);
    const randomeDueDate = (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
    const due = new Date(randomeDueDate);

    const owner = owners[Math.floor(Math.random() * 5)];
    const status = statuses[Math.floor(Math.random() * 4)];
    const effort = Math.ceil(Math.random() * 20);
    const title = `Lorem ispum dolor sit amet, ${(i + 1)}`;
    const id = initialCount + i + 1;

    const issue = {
        id, title, created, due, owner, status, effort,
    };
    db.issues.insertOne(issue);
}

const count = db.issues.count();

// db.counters.update({ _id: 'issues' }, { $set: { current: count } });

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });
// db.issues.createIndex({ id: 1 }, { unique: true });

// db.issues.createIndex({ status: 1 });
// db.issues.createIndex({ owner: 1 });
// db.issues.createIndex({ created: 1 });

// db.deleted_issues.createIndex({ id: 1 }, { unique: true });

print('New issue count:', count);

// code to generate random set of datas
// mongo issuetracker scripts/generate_data.mongo.js
