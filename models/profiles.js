const db = require('./db');

// CREATE TABLE "profiles" (
// 	"id"	INTEGER NOT NULL,
// 	"code"	TEXT NOT NULL UNIQUE,
// 	"fullName"	TEXT NOT NULL,
// 	"sex"	TEXT NOT NULL,
// 	"race"	TEXT NOT NULL,
// 	"email"	TEXT NOT NULL UNIQUE,
// 	"nric"	TEXT NOT NULL UNIQUE,
// 	"entityName"	TEXT,
// 	"UEN"	TEXT UNIQUE,
// 	PRIMARY KEY("id" AUTOINCREMENT)
// );

function createProfile(profile) {
    return db('profiles').insert(profile);
}

function getProfile(code) {
    return db('profiles').select('*').where('code',  code);
}

function listAllProfilesForLogin() {
    return db('profiles').select('code').select('nric');
}

function updateProfile(code, profile) {
    return db('profiles').where('code', code).update(profile);
}

module.exports = {
    createProfile,
    getProfile,
    listAllProfilesForLogin,
    updateProfile
}