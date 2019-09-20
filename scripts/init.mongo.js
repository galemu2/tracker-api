/* eslint no-restricted-globals: "off" */
/* global print, db */
/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas: mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab: mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.issues.remove({});
db.deleted_issues.remove({});

const issuesDB = [
    {
        id: 1,
        status: 'New',
        owner: 'Raven',
        effort: 5,
        created: new Date('2018-08-15'),
        due: undefined,
        title: 'Error in console when clicking Add',
        description: 'Steps to recreate the problem:'
            + '\n1. Refresh the browser.'
            + '\n2. Select "New" in the filter'
            + '\n3. Refresh the browser again. Note the warning in the console:'
            + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
            + '\n   will not be added to the history stack'
            + '\n4. Click on Add.'
            + '\n5. There is an error in console, and add doesn\'t work.',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        effort: 14,
        created: new Date('2018-08-16'),
        due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
        description: 'There needs to be a border in the bottom in the panel'
            + ' that appears when clicking on Add',
    },
    {
        id: 3,
        status: 'New',
        owner: 'Raven',
        effort: 15,
        created: new Date('2015-08-15'),
        due: undefined,
        title: 'Error in console',
        description: 'Steps to recreate the problem:'
            + '\n1. Refresh the browser.'
            + '\n2. Select "New" in the filter',

    },
    {
        id: 4,
        status: 'Fixed',
        owner: 'Eddie',
        effort: 2,
        created: new Date('2019-08-16'),
        due: new Date('2019-08-30'),
        title: 'Missing bottom border on panel',
        description: 'There needs to be a border in the bottom in the panel'
            + ' that appears when clicking on Add',
    },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();

print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });
db.issues.createIndex({ id: 1 }, { unique: true });

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
db.issues.createIndex({ title: 'text', description: 'text' });

db.deleted_issues.createIndex({ id: 1 }, { unique: true });

/**
 * test script with the folloing command
 * $ mongo issuetracker script/init.mongo.js
 */
