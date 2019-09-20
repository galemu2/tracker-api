const { mustBeSignedIn } = require('./auth.js');

let aboutMessage = 'Issue Tracker API v1.0';

function setMessage(_, { message }) {
    aboutMessage = message;
}

function getMessage() {
    return aboutMessage;
}

module.exports = { setMessage: mustBeSignedIn(setMessage), getMessage };
