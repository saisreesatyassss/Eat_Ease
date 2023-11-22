import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import AddRestaurantForm from '../components/AddRestaurantForm';
import EditRestaurantForm  from '../components/EditRestaurantForm';

function Restaurants() {
    const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState({
    coord: [" ", ""],
    street: "",
    zipcode: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rating, setRating] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCuisines, setSelectedCuisines] =useState([]);

  const [maxDistance, setMaxDistance] = useState(null);
  const navigate = useNavigate();
  const handleViewMenu = (restaurant_id) => {
    // Use navigate to redirect to the menu page
    navigate(`/menus/${restaurant_id}`);
  };


const [searchQuery, setSearchQuery] = useState("");
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};
 

  useEffect(() => {
    fetchData();
  }, [sortByDistance]); // Fetch data whenever sortByDistance changeshttps://eat-ease-62d8.onrender.com

  const fetchData = async () => {
    try {
      const response = await fetch("https://eat-ease-62d8.onrender.com/api/eat_ease/restaurants");
      const newData = await response.json();

      // Get user's location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser.');
      }

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
const calculateDistance = (restaurantCoord) => {
  if (userLocation && restaurantCoord && restaurantCoord.length === 2) {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = restaurantCoord[0];
    const lon2 = restaurantCoord[1];

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }
  return null;
};
  const sortRestaurantsByDistance = () => {
    if (userLocation) {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const distanceA = calculateDistance(a.address.coord);
        const distanceB = calculateDistance(b.address.coord);
        return distanceA - distanceB;
      });
      return sortedData;
    }
    return data;
  };


  const sortedRestaurants = sortByDistance ? sortRestaurantsByDistance() : data;
// const filteredRestaurants = sortedRestaurants.filter((restaurant) =>
//   restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
// );
const filteredRestaurants = sortedRestaurants.filter((restaurant) => {
  const distance = calculateDistance(restaurant.address.coord);

  const isOfferValid = !selectedOffer || selectedOffer === 'All' || parseInt(restaurant.offer) <= parseInt(selectedOffer);
  const isRatingValid = !selectedRating || selectedRating === 'All' || parseInt(restaurant.rating) <= parseInt(selectedRating);

 const isSelectedCuisineValid =
    selectedCuisines.length === 0 ||
    (restaurant.cuisine && selectedCuisines.some((cuisine) => restaurant.cuisine.includes(cuisine)));

  return (
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!maxDistance || distance <= parseInt(maxDistance)) &&
    isOfferValid &&
    isRatingValid &&

    isSelectedCuisineValid  
  );
});
const availableCuisines = [
  'North Indian',
  'Chinese',
  'South Indian',
  'Desserts',
  'Pizza',
  'Italian',
  'Arabian',
  'Burgers',
  'European',
  'Multicuisine',
  'Fast Food',
];
const handleCuisineToggle = (cuisine) => {
  setSelectedCuisines((prevSelectedCuisines) => {
    if (cuisine) {
      if (prevSelectedCuisines.includes(cuisine)) {
        return prevSelectedCuisines.filter((selectedCuisine) => selectedCuisine !== cuisine);
      } else {
        return [...prevSelectedCuisines, cuisine];
      }
    }
    return prevSelectedCuisines; 
  });
};


 
  const handleAddRestaurant = () => {
    setShowAddForm(true); 
  };

const handleEditRestaurant = (restaurant) => {
  // Set the restaurant data to be edited
  setEditRestaurant(restaurant);
   setShowEditForm(!showEditForm)// This line was setShowEditForm(true) instead of setShowEditForm(!showEditForm)
};

  const handleUpdateRestaurant = (updatedRestaurant) => {
    // Handle updating the restaurant logic
    console.log('Updating restaurant:', updatedRestaurant);
    // You may want to update your state or make an API call here
    setShowEditForm(true); // Close the form after submission
  };
const handleDeleteRestaurant = async (id) => {
    try {
      // Send DELETE request to delete the restaurant
      const response = await fetch(`https://eat-ease-62d8.onrender.com/api/eat_ease/restaurants/${id}`, {
        method: 'DELETE',
      });

      // Handle the response, update state, or perform other actions
      if (response.ok) {
        console.log('Restaurant deleted successfully');
        // Update your state or perform other actions as needed
      } else {
        console.error('Error deleting restaurant:', response.statusText);
        // Handle the error or show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      // Handle the error or show an error message to the user
    }
  };
  return (
    
        <div className="h-fill">
              <h1 className="text-2xl font-bold mb-4">Restaurant List</h1>

                 
             
            
<div className="flex justify-center items-center">
  <div className="relative w-full max-w-md mx-auto">
    <input
      type="text"
      placeholder="Search by name"
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-4 pr-12 border border-orange-300 rounded-full focus:outline-none focus:border-red-500 transition duration-300 w-full"
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    />
    <div className="absolute right-3 top-3 flex justify-center items-center ">
      <FaSearch className="w-6 h-6 text-orange-500" />
    </div>
  </div>


    <div className="flex items-center justify-center p-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
          onClick={() => setShowAddForm(true)}
        >
          Add Restaurant
        </button>
      </div>
</div>


        <div className="flex">
          <div className=" p-4"> 
          <div className="h-screen*3 flex flex-col bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200">
  <h1 className="text-2xl font-bold mb-4 p-4 text-red-800">Restaurant List</h1>

  <div className="mb-4 p-4">
    <button
      onClick={() => setSortByDistance(!sortByDistance)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
    >
      {sortByDistance ? 'Sort by Distance true' : 'Sort by Distance false'}
    </button>
  </div>

  <div className="flex justify-center mb-4 p-4">
    <input
      type="text"
      placeholder="Search by name"
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-2 border border-gray-300 rounded-md"
    />
  </div>

  <div className="flex p-4 flex-grow">
    <div className="flex flex-col w-full max-w-md p-4 bg-white rounded-lg shadow-md glass mb-4">
      <label className="block mb-2">
        <input
          type="checkbox"
          checked={sortByDistance}
          onChange={() => setSortByDistance(!sortByDistance)}
          className="ml-2"
        />{' '}
        Filter by Distance:
      </label>
      <button
        onClick={() => setSortByDistance(!sortByDistance)}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 mb-4"
      >
        {sortByDistance ? 'Sort by Distance true' : 'Sort by Distance false'}
      </button>

      <label className="block mb-2">Filter by Offer:</label>
      <select
        value={selectedOffer}
        onChange={(e) => setSelectedOffer(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4"
      >
                     <option value="">All</option>
                    <option value="50">50%</option>
                    <option value="40">40%</option>
                    <option value="30">30%</option>
                    <option value="20">20%</option>
                    <option value="10">10%</option> 
      </select>

      <label className="block mb-2">Filter by Rating:</label>
      <select
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4"
      >
            <option value="">All</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option> 
            <option value="3">3 stars</option> 
            <option value="2">2 stars</option> 
            <option value="1">1 stars</option> 
      </select>

      <label className="block mb-2">Filter by Cuisine:</label>
      {/* Assuming you have a list of cuisines */}
      {availableCuisines.map((cuisine) => (
        <div key={cuisine} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={cuisine}
            value={cuisine}
            checked={selectedCuisines.includes(cuisine)}
            onChange={() => handleCuisineToggle(cuisine)}
          />
          <label htmlFor={cuisine} className="ml-2 text-orange-700">
            {cuisine}
          </label>
        </div>
      ))}
    </div>
  </div>
</div>

        
      </div>
  
        <div className="flex flex-wrap gap-4 justify-end p-4 ">
      {filteredRestaurants.map((restaurant) => (
<div key={restaurant.id} className="bg-gradient-to-r from-red-200 via-yellow-200 to-orange-200 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center glass transition-transform transform hover:scale-105 h-[300px]">
<div className="flex flex-col">
  <img
    src={restaurant.photo_url}
    alt="menu"
    className="w-48 h-48 object-contain mr-4 rounded-full"
  />

  <div className="flex">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105 mr-2"
      onClick={() => handleEditRestaurant(restaurant)}
    >
      Edit
    </button>
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105"
      onClick={() => handleDeleteRestaurant(restaurant._id)}
    >
      Delete
    </button>
  </div>
</div>


  <div className="text-center p-4">
    <h2 className="text-xl font-semibold mb-2 text-red-800">{restaurant.name}</h2>
    <p className="text-gray-600 mb-2">{restaurant.description}</p>
    <div className="flex items-center mb-2">
      <p className="text-red-700 mr-2">Rating:</p>
      <p className="text-red-700">{restaurant.rating} stars</p>
    </div>
    <div className="flex items-center mb-2">
      <p className="text-red-700 mr-2">Offer:</p>
      <p className="text-red-700">{restaurant.offer} %</p>
    </div>
  </div>

  <div className="text-center p-4">
    <div className="flex items-center mb-2"></div>
    <p className="text-red-700 mb-2">
      Address: {restaurant.address.street}, {restaurant.address.zipcode}
    </p>
    <p className="text-red-700 mb-2">Cuisine: {restaurant.cuisine}</p>
    <p className="text-red-700 mb-2">Phone Number: {restaurant.phone_number}</p>
    <p className="text-red-700">
      Distance: {calculateDistance(restaurant.address.coord)} miles
    </p>
  </div>

  <div className="flex items-center justify-center p-4">
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
      onClick={() => handleViewMenu(restaurant._id)}
    >
      View Menu
    </button>
  </div>
</div>

      ))}
      
 {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <AddRestaurantForm
            onClose={() => setShowAddForm(false)}
            onAddRestaurant={handleAddRestaurant}
          />
        </div>
      )}

            {showEditForm && editRestaurant && (
                      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <EditRestaurantForm
          restaurant={editRestaurant}
          onClose={() => setShowEditForm(false)}
          onUpdateRestaurant={handleUpdateRestaurant}
        />        </div>

      )}
      </div>
    </div>
    </div>
  );
}

export default Restaurants;
