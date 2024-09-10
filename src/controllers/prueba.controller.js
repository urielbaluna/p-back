const client = requiere("../database/connect.js");

const prof = await client.batch([
    {
        sql:`INSERT INTO forms VALUES (?, ?, ?, ?)`,
        args: [geneteID(), req.body.name, req.body.contact, req.body.description],

    }
], "write");

const result = prof.rows;