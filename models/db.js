const db = require('knex');

let dbFile = './models/identifyme.sqlite3'
if (process.env.ENV === 'test')
    dbFile = './models/identifyme_test.sqlite3'

const connectedKnex = db({
    client: 'sqlite3',
    connection: {
        filename: dbFile
    },
    useNullAsDefault: true
});

module.exports = connectedKnex;