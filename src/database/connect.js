const { createClient } = require('@libsql/client');
const database = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
});
module.exports = database;