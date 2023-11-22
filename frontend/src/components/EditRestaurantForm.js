// // EditRestaurantForm.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditRestaurantForm = ({ restaurant, onClose, onUpdateRestaurant }) => {
//   const [editedRestaurant, setEditedRestaurant] = useState({
//     name: '',
//     description: '',
//     rating: '',
//     offer: '',
//     address: '',
//     cuisine: '',
//     phone_number: '',
//     // Add other fields as needed
//   });

//   useEffect(() => {
//     setEditedRestaurant(restaurant);
//   }, [restaurant]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedRestaurant((prevRestaurant) => ({
//       ...prevRestaurant,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send PUT request to update the restaurant
//       const response = await axios.put(`/api/eat_ease/restaurants/${restaurant._id}`, editedRestaurant);
      
//       // Handle the response, update state, or perform other actions
//       console.log('Restaurant updated successfully:', response.data);
//       onUpdateRestaurant(response.data); // Assuming the API returns the updated restaurant
//     } catch (error) {
//       console.error('Error updating restaurant:', error);
//     }

//     onClose();
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700 focus:outline-none"
//         >
//           Close
//         </button>
//       </div>
//       <h2 className="text-2xl font-semibold mb-4">Edit Restaurant</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Add form fields based on your requirements */}
//         <label className="block mb-2">
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={editedRestaurant.name}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded-md w-full"
//             required
//           />
//         </label>
//         <label className="block mb-2">
//           Description:
//           <textarea
//             name="description"
//             value={editedRestaurant.description}
//             onChange={handleInputChange}
//             className="p-2 border border-gray-300 rounded-md w-full"
//           />
//         </label>
//         {/* Add other form fields here */}
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105"
//         >
//           Update Restaurant
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditRestaurantForm;
// EditRestaurantForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRestaurantForm = ({ restaurant, onClose, onUpdateRestaurant }) => {
  const [editedRestaurant, setEditedRestaurant] = useState({
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

  useEffect(() => {
    setEditedRestaurant(restaurant);
  }, [restaurant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to update the restaurant
const response = await axios.put(`https://eat-ease-62d8.onrender.com/api/eat_ease/restaurants/${restaurant._id}`, editedRestaurant);
      
      // Handle the response, update state, or perform other actions
      console.log('Restaurant updated successfully:', response.data);
      onUpdateRestaurant(response.data); // Assuming the API returns the updated restaurant
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Close
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Edit Restaurant</h2>
        <form onSubmit={handleSubmit}>
           <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={editedRestaurant.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={editedRestaurant.description}
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
                value={editedRestaurant.cuisine}
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
                value={editedRestaurant.phone_number}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>
            </div>
            </div>
 <div className="flex">
  <div className="w-1/2 pr-2">
    <label className="block mb-2">
      Rating:
      <input
        type="text"
        name="rating"
        value={editedRestaurant.rating}
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
        value={editedRestaurant.offer}
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
                value={editedRestaurant.address}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>

          
            <label className="block mb-2">
            photo_url:
            <input
                type="text"
                name="phone_number"
                value={editedRestaurant.photo_url}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105"
          >
            Update Restaurant
          </button>
        </form>

      </div>
    </div>
  );
};

export default EditRestaurantForm;
