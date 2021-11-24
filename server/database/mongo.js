const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URL;
let client;

async function dbConnect() {
    try {
        client = new MongoClient(uri);
        await client.connect();
    } catch(e) {
        throw new Error("Failed to connect database");
    }
}


async function getDBClient() {
    return client;
}

async function main() {
    await dbConnect();
}

main();

module.exports = {
    getDBClient,
}
