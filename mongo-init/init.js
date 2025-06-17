db = db.getSiblingDB('web_project_test');
db.createCollection("placeholder");
db.placeholder.insertOne({ init: true });
