// import React, { useState, useEffect } from 'react';

// function Cart() {
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         // Replace 'http://localhost:2000' with your actual API endpoint
//         const response = await fetch('http://localhost:2000/api/eat_ease/carts'); // Assuming this endpoint returns the cart data
//         const data = await response.json();

//         console.log('Cart data:', data);

//         // Update the component state with the fetched cart data
//         setCartData(data);
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//       }
//     };

//     fetchCartData();
//   }, []); // Empty dependency array ensures the useEffect runs only once when the component mounts

//   return (
//     <div>
//       <h2>Shopping Cart</h2>
//       {cartData.length > 0 ? (
//         cartData.map((cartItem) => (
//           <div key={cartItem._id}>
//             <h3>{cartItem.restaurant_id}</h3>
//             <ul>
//               {cartItem.cartItems.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - ${item.price}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart</p>
//       )}
//     </div>
//   );
// }

// export default Cart; 
import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({ name: '', photo_url: '' });

 const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:2000/api/eat_ease/carts');
        const data = await response.json();

        console.log('Cart data:', data);

        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchRestaurantDetails = async (restaurant_id) => {
    try {
      const response = await fetch(`http://localhost:2000/api/eat_ease/restaurants/${restaurant_id}`);
      const data = await response.json();

      return data || {}; // Return an empty object if data is null
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      return {};
    }
  };


const handleDeleteItem = async (cartId, itemId) => {
  try {
    const response = await fetch(`http://localhost:2000/api/eat_ease/carts/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: cartId, itemId }),
    });

    if (response.ok) {
       fetchCartData();
    } else {
      console.error('Error deleting item from the cart:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting item from the cart:', error);
  }
};
const handleDeleteRestaurant = async (cartId) => {
  try {
    const response = await fetch(`http://localhost:2000/api/eat_ease/carts/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: cartId }),
    });

    if (response.ok) {
      fetchCartData(); // Assuming this function fetches the updated cart data
    } else {
      console.error('Error deleting restaurant from the cart:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting restaurant from the cart:', error);
  }
};


 useEffect(() => {
  const fetchData = async () => {
    const detailsPromises = cartData.map(async (cartItem) => {
      const details = await fetchRestaurantDetails(cartItem?.restaurant_id);
      return details;
    });

    const allDetails = await Promise.all(detailsPromises);
    setRestaurantDetails(allDetails);
  };

  fetchData();
}, [cartData]);

return (
  <div>
    <h2>Shopping Cart</h2>
    {restaurantDetails.length > 0 &&
      restaurantDetails.map((restaurant, index) => (
        <div key={index}>
          <h3>{restaurant.name}</h3>
          
          <img
            src={restaurant.photo_url}
            alt={restaurant.name}
            style={{ width: '100px', height: '100px' }}
          />
          <ul>
            {cartData
              .filter((cartItem) => cartItem.restaurant_id === restaurant._id)
              .flatMap((cartItem) =>
                cartItem.cartItems.map((item, index) => (
                  <li key={index}>
                  <button onClick={() => handleDeleteRestaurant(cartItem._id)}>
                      Delete
                    </button> 
                    {item.name} - ${item.price}
                   <button onClick={() => handleDeleteItem(cartItem._id, item.itemId)}>
                      Delete
                    </button> 
                  </li>
                ))
              )}
          </ul>
        </div>
      ))}
  </div>
);

}

export default Cart;
