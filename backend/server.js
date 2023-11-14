// backend/server.js
const express = require('express');
const crudOperations = require('./crudOperations');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

// Use native Node.js server with Express app
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const uri = "mongodb+srv://admin:wRbgDRMiE3dPAAWG@cluster0.7pvsfld.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());

// Your CRUD operations
app.post('/api/create', async (req, res) => {
  const { database, collection, document } = req.body;
  try {
    await client.connect();
    await crudOperations.createDocument(database, collection, document);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
  res.status(200).send('Document created successfully');
});

app.get('/api/read', async (req, res) => {
  const { database, collection, query } = req.query;
  try {
    await client.connect();
    const documents = await crudOperations.readDocuments(database, collection, query ? JSON.parse(query) : {});
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error reading documents:", error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});
 
// Add routes for update and delete as needed















// // backend/server.js
// const crudOperations = require('./crudOperations');

// async function main() {
//   await crudOperations.connect();

//   // Example CRUD operations
//   await crudOperations.createDocument("sample_restaurants", "restaurants", { name: "John", age: 30 });
//   await crudOperations.readDocuments("sample_restaurants", "restaurants");
//   await crudOperations.updateDocument("sample_restaurants", "restaurants", { name: "John" }, { age: 31 });
//   await crudOperations.readDocuments("sample_restaurants", "restaurants");
//   await crudOperations.deleteDocument("sample_restaurants", "restaurants", { name: "" });
//   await crudOperations.readDocuments("sample_restaurants", "restaurants");

//   await crudOperations.close();
// }

// main().catch(console.error);

// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://admin:wRbgDRMiE3dPAAWG@cluster0.7pvsfld.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Check if the connection is successful
//     if (client.connect()) {
//       console.log("Connected to MongoDB!");

//       // Access the "restaurants" collection
//       const restaurantsCollection = client.db("sample_restaurants").collection("restaurants");

//       // Retrieve and print documents from the "restaurants" collection
//       const documents = await restaurantsCollection.find({}).toArray();
//       console.log("Documents in 'restaurants' collection:", documents);
//     } else {
//       console.error("Failed to connect to MongoDB");
//     }
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   } finally {
//     // Ensure that the client will close when you finish/error
//     await client.close();
//     console.log("MongoDB connection closed.");
//   }
// }

// run().catch(console.error);

