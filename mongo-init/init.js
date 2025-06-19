db = db.getSiblingDB('arcanet');
db.createCollection("placeholder");
db.placeholder.insertOne({ init: true });