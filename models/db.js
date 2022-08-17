const db = require('knex');

const connectedKnex = db({
    client: 'sqlite3',
    connection: {
        filename: './models/identifyme.sqlite3'
    },
    useNullAsDefault: true
});

module.exports = connectedKnex;