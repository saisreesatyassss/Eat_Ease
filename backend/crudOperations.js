// backend/crudOperations.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:wRbgDRMiE3dPAAWG@cluster0.7pvsfld.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function close() {
  await client.close();
  console.log("MongoDB connection closed.");
}

async function createDocument(database, collectionName, document) {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  
  try {
    const result = await collection.insertOne(document);
    console.log(`Document inserted with ID: ${result.insertedId}`);
  } catch (error) {
    console.error("Error creating document:", error);
  }
}

async function readDocuments(database, collectionName, query = {}) {
  const db = client.db(database);
  const collection = db.collection(collectionName);

  try {
    const documents = await collection.find(query).toArray();
    console.log("Documents:", documents);
  } catch (error) {
    console.error("Error reading documents:", error);
  }
}

async function updateDocument(database, collectionName, query, update) {
  const db = client.db(database);
  const collection = db.collection(collectionName);

  try {
    const result = await collection.updateOne(query, { $set: update });
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

async function deleteDocument(database, collectionName, query) {
  const db = client.db(database);
  const collection = db.collection(collectionName);

  try {
    const result = await collection.deleteOne(query);
    console.log(`Deleted ${result.deletedCount} document(s)`);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

module.exports = {
  connect,
  close,
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};
