import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantForm = ({ onClose, onAddRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    rating: '',
    offer: '',
    address: '',
    cuisine: '',
    phone_number: '',
    photo_url: '',
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server
      const response = await axios.post('https://eat-ease-62d8.onrender.com/api/eat_ease/restaurants', newRestaurant);
      
      // Handle the response, update state, or perform other actions
      console.log('Restaurant added successfully:', response.data);
      onAddRestaurant(newRestaurant);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }

    // Reset form and close pop-up
    setNewRestaurant({
      name: '',
      description: '',
      rating: '',
      offer: '',
      address: '',
      cuisine: '',
      phone_number: '',
      photo_url: '',
    });
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Close
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields based on your requirements */}
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={newRestaurant.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={newRestaurant.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label> 
    <div className="flex">
  <div className="w-1/2 pr-2">
    <label className="block mb-2">
      Rating:
      <input
        type="text"
        name="rating"
        value={newRestaurant.rating}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
    </label>
  </div>
  <div className="w-1/2 pl-2">
    <label className="block mb-2">
      Offer (%):
      <input
        type="text"
        name="offer"
        value={newRestaurant.offer}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
    </label>
  </div>
</div>


            <label className="block mb-2">
            Address:
            <input
                type="text"
                name="address"
                value={newRestaurant.address}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>

            <div className="flex">
  <div className="w-1/2 pr-2">

         <label className="block mb-2 ">
            Cuisine:
            <input
                type="text"
                name="cuisine"
                value={newRestaurant.cuisine}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>
            </div>
              <div className="w-1/2 pr-2">

              <label className="block mb-2">
              
            Phone Number:
            <input
                type="text"
                name="phone_number"
                value={newRestaurant.phone_number}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>
            </div>
            </div>

          <label className="block mb-2">
            photo_url:
            <input
                type="text"
                name="address"
                value={newRestaurant.photo_url}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
