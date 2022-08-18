const db = require('./db');

// CREATE TABLE "profiles" (
// 	"id"	INTEGER NOT NULL,
// 	"code"	TEXT NOT NULL UNIQUE,
// 	"fullName"	TEXT NOT NULL,
// 	"sex"	TEXT NOT NULL,
// 	"race"	TEXT NOT NULL,
// 	"email"	TEXT,
// 	"nric"	TEXT NOT NULL,
// 	"entityName"	TEXT,
// 	"UEN"	TEXT,
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