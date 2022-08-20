const db = require('./db');
const tableName = 'profiles';

async function createProfile(profile) {
    return db(tableName).insert(profile);
}

async function getProfile(code) {
    return db(tableName).select('*').where('code', code);
}

async function listAllProfilesForLogin() {
    return db(tableName).select('code').select('nric');
}

async function dropTable() {
    return db.schema.dropTable(tableName);
}

async function createTableIfNotExist() {
    const exists = await db.schema.hasTable(tableName);
    if (!exists) {
        await db.schema.createTable(tableName, (table) => {
            table.increments('id').primary().notNullable();
            table.text('code').notNullable();
            table.text('fullName').notNullable();
            table.text('sex').notNullable();
            table.text('race').notNullable();
            table.text('email').notNullable().unique();
            table.text('nric').notNullable().unique();
            table.text('entityName');
            table.text('UEN');
        });
    }

    await createProfile({
            code: 'SG12345678Z',
            fullName: 'John Doe',
            sex: 'Male',
            race: 'Chinese',
            email: 'john_doe@gmail.com',
            nric: 'S9025123Z'
        });

    await createProfile({
            code: 'SG11111111A',
            fullName: 'Jane Doe',
            sex: 'Female',
            race: 'Chinese',
            email: 'jane_doe@gmail.com',
            nric: 'S8812321A',
            entityName: 'Arrow Goldsmith',
            UEN: '53234923K'
        });
}

module.exports = {
    createProfile,
    getProfile,
    listAllProfilesForLogin,
    dropTable,
    createTableIfNotExist
}