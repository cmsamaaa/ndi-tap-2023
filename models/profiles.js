const db = require('./db');

// CREATE TABLE "profiles" (
// 	"id"	INTEGER NOT NULL,
// 	"code"	TEXT NOT NULL UNIQUE,
// 	"firstName"	TEXT NOT NULL,
// 	"lastName"	TEXT NOT NULL,
// 	"gender"	TEXT NOT NULL,
// 	"nric"	TEXT NOT NULL,
// 	"organisation"	TEXT,
// 	PRIMARY KEY("id" AUTOINCREMENT)
// );

function createProfile(profile) {
    return db('profiles').insert(profile);
}

function getProfile(code) {
    return db('profiles').select('*').where('code',  code);
}

function updateProfile(code, profile) {
    return db('profiles').where('code', code).update(profile);
}

module.exports = {
    createProfile,
    getProfile,
    updateProfile
}