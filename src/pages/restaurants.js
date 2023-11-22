import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Restaurants() {
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
  }, [sortByDistance]); // Fetch data whenever sortByDistance changes

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/eat_ease/restaurants");
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

//   const calculateDistance = (restaurantCoord) => {
//     if (userLocation && restaurantCoord && restaurantCoord.length === 2) {
//       const userCoord = [userLocation.latitude, userLocation.longitude];
//       // Use a suitable formula to calculate distance (e.g., Haversine formula)
//       // This is a simplified example for illustration purposes
//       const distance = Math.sqrt(
//         Math.pow(userCoord[0] - restaurantCoord[0], 2) +
//         Math.pow(userCoord[1] - restaurantCoord[1], 2)
//       );
//       return distance;
//     }
//     return null;
//   };
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
    return prevSelectedCuisines; // Return the previous state if cuisine is undefined
  });
};

  return (
    
    <div className="h-screen*3">
      <h1 className="text-2xl font-bold mb-4">Restaurant List</h1>

      <div className="mb-4">
        <button onClick={() => setSortByDistance(!sortByDistance)}>
          {sortByDistance ? 'Sort by Distance true ' : 'Sort by Distance false '}
        </button>
      </div>
 {/* Search bar */}
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
<div className="flex">
  {/* Left column for filter options */}
  <div className="w-1/2 p-4"> 
    <label className="block mb-2">
       
        <input
          type="checkbox"
          checked={sortByDistance}
          onChange={() => setSortByDistance(!sortByDistance)}
          className="ml-2"
        /> Filter by Distance:
      </label>
   <button  onClick={() => setSortByDistance(!sortByDistance)}>
          {sortByDistance ? 'Sort by Distance true ' : 'Sort by Distance false '}
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
  
  <div key={cuisine}>
    <input
      type="checkbox"
      id={cuisine}
      value={cuisine}
      checked={selectedCuisines.includes(cuisine)}
      onChange={() => handleCuisineToggle(cuisine)}
    />
    <label htmlFor={cuisine}>{cuisine}</label>
  </div>
))}

  </div>
     <div className="flex flex-wrap gap-4 justify-end p-4 ">
  {filteredRestaurants.map((restaurant) => (
    <div   key={restaurant.id} className="bg-white p-4 rounded-lg shadow-md flex"> 
      <img
        src={restaurant.photo_url}
        alt="menu"
        className="w-[200px] h-[200px] object-contain mr-4"
      />
 
      <div className=" px-20">
        <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 mb-2">{restaurant.description}</p>
        <div className="flex items-center mb-2">
          <p className="text-gray-700 mr-2">Rating:</p> 
          <p className="text-gray-700">{restaurant.rating} stars</p>
        </div> 
        <div className="flex items-center mb-2">
          <p className="text-gray-700 mr-2">offer:</p> 
          <p className="text-gray-700">{restaurant.offer} %</p>
        </div> 
      
      </div>
      <div>
 
        <div className="flex items-center mb-2">  
        </div>
        <p className="text-gray-700 mb-2">
          Address: {restaurant.address.street}, {restaurant.address.zipcode}
        </p>
        <p className="text-gray-700 mb-2">
          cuisine: {restaurant.cuisine}
        </p>
        <p className="text-gray-700 mb-2">Phone Number: {restaurant.phone_number}</p>
       <p className="text-gray-700">
              Distance: {calculateDistance(restaurant.address.coord)} miles
            </p>
     
      </div>
      <div className="align-center"> 
      <button onClick={() => handleViewMenu(restaurant._id)}>View Menu</button>

      </div>
    </div>
  ))}
</div>
</div>
    </div>
  );
}

export default Restaurants;
