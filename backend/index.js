const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');

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



 // Handle GET request to retrieve data from the "restaurant" collection by ID
app.get('/api/eat_ease/restaurants/:id', async (req, res) => {
  try {
    // console.log("Received GET request for item with ID:", req.params.id);

    // Check if the database is connected
    if (database) {
      const result = await database.collection("restaurants").findOne({ _id: new ObjectId(req.params.id) });

      // Check if the document is found
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } else {
      res.status(500).send("Database not connected");
    }
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.get('/api/eat_ease/menus/:restaurant_id', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      const restaurant_id = req.params.restaurant_id;

      let query = {};

      // Check if 'restaurant_id' parameter is present
      if (restaurant_id) {
        query.restaurant_id = restaurant_id;
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
// Assuming you have the 'database' variable connected to MongoDB

app.get('/api/eat_ease/carts', async (req, res) => {
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

      const result = await database.collection("carts").find(query).toArray();
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
// app.post('/api/eat_ease/menus', async (req, res) => {
//   try {
//     // Check if the database is connected
//     if (database) {
//       const result = await database.collection("menus").insertOne(req.body);  
//       res.json(result);
//     } else {
//       res.status(500).send("Database not connected");
//     }
//   } catch (error) {
//     console.error("Error inserting data into MongoDB:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
 // In your server.js or routes file
// app.post('/api/cart/add', async (req, res) => {
//   try {
//     const { restaurant_id, menuItem } = req.body;

//     // Check if the cart already exists for the given restaurant_id
//     const existingCart = await database.collection('carts').findOne({ restaurant_id });

//     if (existingCart) {
//       // Check if the existing cart has the same restaurant_id
//       if (existingCart.restaurant_id === restaurant_id) {
//         // Add logic to update the existing cart with the new item
//         const updatedCart = await database.collection('carts').findOneAndUpdate(
//           { restaurant_id },
//           { $push: { cartItems: menuItem } },
//           { returnDocument: 'after' }
//         );

//         return res.json(updatedCart.value);
//       } else {
//         return res.status(400).json({ error: 'Cannot add items from different restaurants to the same cart.' });
//       }
//     } else {
//       // If no cart exists, create a new cart
//       const result = await database.collection('carts').insertOne({
//         restaurant_id,
//         cartItems: [menuItem], // Use an array to store cart items
//       });

//       return res.json(result.ops[0]);
//     }
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return res.status(500).send('Internal Server Error');
//   }
// });
const { v4: uuidv4 } = require('uuid');

app.post('/api/cart/add', async (req, res) => {
  try {
    const { restaurant_id, menuItem } = req.body;  
      // Add a unique ID to the menuItem

   const itemId = uuidv4();
    menuItem.itemId = itemId;
    // Check if the cart already exists for the given restaurant_id
    const existingCart = await database.collection('carts').findOne({ restaurant_id });

    if (existingCart) {
      // Check if the existing cart has the same restaurant_id
      if (existingCart.restaurant_id === restaurant_id) {
        // Add logic to update the existing cart with the new item
        const updatedCart = await database.collection('carts').findOneAndUpdate(
          { restaurant_id },
          { $push: { cartItems: menuItem } },
          { returnDocument: 'after' }
        );

        return res.json(updatedCart.value);
      } else {
        return res.status(400).json({ error: 'Cannot add items from different restaurants to the same cart. Please clear your cart first.' });
      }
    } else {
      // If no cart exists, create a new cart
      const result = await database.collection('carts').insertOne({
        restaurant_id,
        cartItems: [menuItem], // Use an array to store cart items
      });

      if (result.ops && result.ops.length > 0) {
        return res.json(result.ops[0]);
      } else {
        return res.status(500).send('Internal Server Error');
      }
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).send('Internal Server Error');
  }
});


// In your server.js or routes file

// Handle DELETE request to remove an item from the cart
    // app.delete('/api/eat_ease/carts/delete', async (req, res) => {
    //     console.log('Received DELETE request:', req.body); // Add this line
    //   try {
    //     const { restaurantId, itemId } = req.body;

    //     // Check if the database is connected
    //     if (database) {
    //       // Update the cart by removing the specified item
    //       const result = await database.collection('carts').updateOne(
    //         { restaurantId },
    //         { $pull: { 'cartItems': { _id: new ObjectId(itemId) } } }
    //       );

    //       // Check if any document was modified
    //       if (result.modifiedCount > 0) {
    //         res.json({ message: 'Item deleted from the cart successfully' });
    //       } else {
    //         res.status(404).json({ error: 'Item not found in the cart' });
    //       }
    //     } else {
    //       res.status(500).send('Database not connected');
    //     }
    //   } catch (error) {
    //     console.error('Error deleting item from the cart:', error);
    //     res.status(500).send('Internal Server Error');
    //   }
    // });
// Handle DELETE request to remove an item from the cart by name  
      // const result = await database.collection("restaurants").deleteOne({ _id: new ObjectId(req.params.id) });

//       carts = await database.collection("carts").find({ _id: new ObjectId(_id) }).toArray();
// console.log(carts);
app.delete('/api/eat_ease/carts/delete', async (req, res) => {
  console.log('Received DELETE request:', req.body);
  try {
    const { _id, itemId } = req.body;

    if (database) {
      const result = await database.collection('carts').updateOne(
        { _id: new ObjectId(_id) },
        { $pull: { 'cartItems': { 'itemId': itemId } } }
      );

      // console.log('Result:', result);

      if (result.modifiedCount > 0) {
        // Fetch and return all items in the cart after deletion
        const updatedCart = await database.collection('carts').findOne({ _id: new ObjectId(_id) });
        res.json(updatedCart.cartItems);
      } else {
        res.status(404).json({ error: 'Item not found in the cart' });
      }
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error deleting item from the cart:', error);
    res.status(500).send('Internal Server Error');
  }
});
 app.delete('/api/eat_ease/carts/remove', async (req, res) => {
  console.log('Received DELETE request:', req.body);
  try {
    const { _id } = req.body;

    if (database) {
      const result = await database.collection('carts').deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount > 0) {
        res.json({ message: 'Restaurant removed successfully' });
      } else {
        res.status(404).json({ error: 'Restaurant not found' });
      }
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error removing restaurant:', error);
    res.status(500).send('Internal Server Error');
  }
});

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Specify the directory where uploaded files will be stored inside the public folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.resolve(__dirname, './public/uploads')));


// server for the get eatclips
app.get('/api/eat_ease/eatclips', async (req, res) => {
  try {
    // Check if the database is connected
    if (database) {
      const result = await database.collection("eatclips").find().toArray();

      // Update the result to include the full video URL
      const updatedResult = result.map((clip) => ({
        _id: clip._id,
        title: clip.title,
        description: clip.description,
        videoUrl: `http://localhost:2000/${clip.videoUrl}`, // Update the URL
      }));

      res.json(updatedResult);
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/api/eat_ease/eatclips', async (req, res) => {
//   try {
//     // Check if the database is connected
//     if (database) {
//       let query = {};

//       // Check if 'id' parameter is present
//       if (req.query.id) {
//         query._id = ObjectId(req.query.id); // Convert string to ObjectId
//       }

//       // Check if 'title' parameter is present
//       if (req.query.title) {
//         query.title = req.query.title;
//       }
   

//       const result = await database.collection("eatclips").find(query).toArray();
//       res.json(result);
//     } else {
//       res.status(500).send('Database not connected');
//     }
//   } catch (error) {
//     console.error('Error fetching data from MongoDB:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

//server to post the eatclips
app.post('/api/eat_ease/eatclips', upload.single('video'), async (req, res) => {
  try {
    if (!database) {
      return res.status(500).send('Database not connected');
    }

    const { title, description } = req.body;
    const videoUrl = req.file.path; // Use the path of the uploaded file

    const result = await database.collection('eatclips').insertOne({ title, description, videoUrl });
    res.json(result);
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});
// app.post('/api/eat_ease/eatclips', async (req, res) => {
//   console.log('Received post request:', req.body);
//   try {
//     // Check if the database is connected
//     if (database) {
//       const result = await database.collection("eatclips").insertOne(req.body);  
//       res.json(result);
//     } else {
//       res.status(500).send("Database not connected");
//     }
//   } catch (error) {
//     console.error("Error inserting data into MongoDB:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
//give me ui code for posting the eatclips data
//server to delete the eatclips
app.delete('/api/eat_ease/eatclips/:id', async (req, res) => {
    console.log('Received delete request:', req.body);

  try {
    const itemId = req.params.id;

    if (!itemId) {
      console.log('Item ID is undefined');
      return res.status(400).json({ message: 'Item ID is required' });
    }

    console.log('Received DELETE request for item with ID:', itemId);

    // Check if the database is connected
    if (database) {
      const result = await database.collection('eatclips').deleteOne({ _id: new ObjectId(itemId) });
      console.log('Deletion result:', result);

      // Check if any document was deleted
      if (result.deletedCount > 0) {
        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } else {
      res.status(500).send('Database not connected');
    }
  } catch (error) {
    console.error('Error deleting data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});
