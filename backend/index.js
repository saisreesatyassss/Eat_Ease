const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:wRbgDRMiE3dPAAWG@cluster0.7pvsfld.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { ObjectId } = require('mongodb');

let database; // Define database variable

app.use(express.json());
app.use(cors());

// Move the connection logic inside an async function
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    database = client.db("eat_ease");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Use the async function to connect before starting the server
connectToMongoDB().then(() => {
  app.listen(2000, () => {
    console.log('Server listening on port 2000');
  });
});

// Handle GET request to fetch data from the "restaurant" collection
// Handle GET request to fetch data from the "restaurant" collection
// app.get('/api/eat_ease/restaurants', async (req, res) => {
//   try {
//     // Check if the database is connected
//     if (database) {
//       let query = {};

//       // Check if 'id' parameter is present
//       if (req.query.id) {
//         query._id = req.query.id;
//       }

//       // Check if 'name' parameter is present
//       if (req.query.name) {
//         query.name = req.query.name;
//       }

//       // Check if 'age' parameter is present
//       if (req.query.age) {
//         query.age = req.query.age;
//       }

//       const result = await database.collection("restaurants").find(query).toArray();
//       res.json(result);
//     } else {
//       res.status(500).send("Database not connected");
//     }
//   } catch (error) {
//     console.error("Error fetching data from MongoDB:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// Handle GET request to fetch data from the "restaurants" collection
app.get('/api/eat_ease/restaurants', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      let query = {};

      // Check if 'id' parameter is present
      if (req.query.id) {
        query._id = ObjectId(req.query.id); // Convert string to ObjectId
      }

      // Check if 'name' parameter is present
      if (req.query.name) {
        query.name = req.query.name;
      }

      const result = await database.collection("restaurants").find(query).toArray();
      res.json(result);
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle POST request to insert data into the "restaurant" collection
app.post('/api/eat_ease/restaurants', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      const result = await database.collection("restaurants").insertOne(req.body);  
      res.json(result);
    } else {
      res.status(500).send("Database not connected");
    }
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});
   
// Handle DELETE request to delete data from the "restaurant" collection by name
// app.delete('/api/eat_ease/restaurants/:name', async (req, res) => {
//   try {
//     console.log("Received DELETE request for item with Name:", req.params.name);

//     // Check if the database is connected
//     if (database) {
//       const result = await database.collection("restaurants").deleteOne({ name: req.params.name });
//       console.log("Deletion result:", result);

//       // Check if any document was deleted
//       if (result.deletedCount > 0) {
//         res.json({ message: "Item deleted successfully" });
//       } else {
//         res.status(404).json({ message: "Item not found" });
//       }
//     } else {
//       res.status(500).send("Database not connected");
//     }
//   } catch (error) {
//     console.error("Error deleting data from MongoDB:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// Handle DELETE request to delete data from the "restaurant" collection by ID
 app.delete('/api/eat_ease/restaurants/:id', async (req, res) => {
  try {
    console.log("Received DELETE request for item with ID:", req.params.id);

    // Check if the database is connected
    if (database) {
      const result = await database.collection("restaurants").deleteOne({ _id: new ObjectId(req.params.id) });
      console.log("Deletion result:", result);

      // Check if any document was deleted
      if (result.deletedCount > 0) {
        res.json({ message: "Item deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } else {
      res.status(500).send("Database not connected");
    }
  } catch (error) {
    console.error("Error deleting data from MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});
 



// Handle PUT request to update data in the "restaurant" collection by ID
app.put('/api/eat_ease/restaurants/:id', async (req, res) => {
  try {
    console.log("Received PUT request for item with ID:", req.params.id);

    // Check if the database is connected
    if (database) {
      const result = await database.collection("restaurants").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      console.log("Update result:", result);

      // Check if any document was modified
      if (result.modifiedCount > 0) {
        res.json({ message: "Item updated successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } else {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
      res.status(500).send("Database not connected");
    }
  } catch (error) {
    console.error("Error updating data in MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});


 

app.get('/api/eat_ease/menus/:restaurant_id', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      const restaurantId = req.params.restaurant_id;

      let query = {};

      // Check if 'restaurant_id' parameter is present
      if (restaurantId) {
        query.restaurant_id = restaurantId;
      }

      const result = await database.collection("menus").find(query).toArray();
      res.json(result);
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/eat_ease/menus', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      let query = {};

      // Check if 'id' parameter is present
      if (req.query.id) {
        query._id = ObjectId(req.query.id); // Convert string to ObjectId
      }

      // Check if 'restaurant_id' parameter is present
      if (req.query.restaurant_id) {
        query.restaurant_id = req.query.restaurant_id;
      }

      const result = await database.collection("menus").find(query).toArray();
      res.json(result);
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Handle POST request to insert data into the "restaurant" collection
app.post('/api/eat_ease/menus', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      const result = await database.collection("menus").insertOne(req.body);  
      res.json(result);
    } else {
      res.status(500).send("Database not connected");
    }
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});
 