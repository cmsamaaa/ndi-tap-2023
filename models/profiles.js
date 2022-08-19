const db = require('./db');

function createProfile(profile) {
    return db('profiles').insert(profile);
}

function getProfile(code) {
    return db('profiles').select('*').where('code',  code);
}

function listAllProfilesForLogin() {
    return db('profiles').select('code').select('nric');
}

function dropTable() {
    return db.schema.dropTable('profiles');
}

module.exports = {
    createProfile,
    getProfile,
    listAllProfilesForLogin,
    dropTable
}