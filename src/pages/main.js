import React, { useState, useEffect } from "react";
import LocationComponent from "../components/location";

function Main() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [ageFilter, setAgeFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track the selected item for update 
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/eat_ease/restaurants");
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch("http://localhost:2000/api/eat_ease/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      fetchData();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

const handleDelete = async (itemId) => {
  try {
    console.log("Deleting item with ID:", itemId);

    const url = `http://localhost:2000/api/eat_ease/restaurants/${encodeURIComponent(itemId)}`;
    console.log("DELETE request URL:", url);

    await fetch(url, {
      method: "DELETE",
    });

    fetchData(); // After successful deletion, fetch updated data
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};


const handleUpdate = async () => {
  try {
    await fetch(`http://localhost:2000/api/eat_ease/restaurants/${selectedItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updateName, age: updateAge }), // Use updateName and updateAge
    });

    fetchData();
    setSelectedItemId(null); // Reset selected item after updating 
    setUpdateName("");
    setUpdateAge("");

  } catch (error) {
    console.error("Error updating item:", error);
  }
};
const handleEdit = (itemId) => {
  const selectedItem = data.find(item => item._id === itemId);
  setSelectedItemId(itemId);
  setUpdateName(selectedItem.name);
  setUpdateAge(selectedItem.age);
};

const handleCancelEdit = () => {
  setSelectedItemId(null);
  setUpdateName("");
  setUpdateAge("");
};

  return (
    <div className="h-screen">
      <div>
        {/* Input fields for creating a new item */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button onClick={handleCreate}>Submit</button>
      </div>
  <div>
        {/* Input fields for updating an existing item */}
        {selectedItemId && (
          <div>
            <label>
              Updated Name:
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </label>
            <label>
              Updated Age:
              <input
                type="text"
                value={updateAge}
                onChange={(e) => setUpdateAge(e.target.value)}
              />
            </label>
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </div>
       <div>
  <h2>All Data</h2>
  {/* Display all data */}
  {data.map((item) => (
    <div key={item._id}>
      {item.name} (Age: {item.age})
      <button onClick={() => handleEdit(item._id)}>Delete</button>
    </div>
  ))}
</div>

    <LocationComponent /> 

       
    </div>
  );
}

export default Main;
