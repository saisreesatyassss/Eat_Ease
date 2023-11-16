import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Cart from './cart';


function Menu() {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/eat_ease/menus/${restaurantId}`);
        const data = await response.json();
        console.error('Full response:', data);

        setMenuItems(data);
        console.log('Menu data:', data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, [restaurantId]);
  const addToCart = (menuItem) => {
    setCartItems((prevItems) => [...prevItems, menuItem]);
    
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 h- ">Menu</h2>

      {menuItems.map((item) => (
        <div key={item._id} className="mb-8 p-4 border border-black rounded-md">
          <h3 className="text-lg font-semibold mb-2">{item.restaurant_id}</h3>
          <ul>
            {item.menuData.map((category) => (
              <li key={category.category} className="mb-4">
                <h4 className="text-md font-semibold mb-2">{category.category}</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((menuItem) => (
                    <div key={menuItem.name} className="border p-4 rounded-md bg-white">
                    <img
                          src={menuItem.photo_url}
                          alt="menu"
                          className="w-[200px] h-[200px] object-contain"
                        />
                      <h5 className="text-sm font-semibold mb-1">{menuItem.name}</h5>
                      <p className="text-xs text-gray-500 mb-2">${menuItem.price}</p>
                      <p className="text-xs text-gray-500 mb-2">{menuItem.rating}</p>    
                      <p className="text-sm">{menuItem.description}</p>
                        {menuItem.isNonVeg ? (
                        <span className="text-red-500">&#8226; nonveg</span>
                      ) : (
                        <span className="text-green-500">&#8226; veg</span>
                      )}
                    <button onClick={() => addToCart(menuItem)}>Add to Cart</button>

                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
            <Cart cartItems={cartItems} />

      <Link to="/cart">View Cart</Link>

      <p>Hello, this is the menu page for the restaurant.</p>
    </div>
  );
}

export default Menu;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function Menu() {
//   const { restaurantId } = useParams();
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await fetch(`http://localhost:2000/api/eat_ease/menus/${restaurantId}`);
//         const data = await response.json();

//         setMenuItems(data);
//         console.log('Menu data:', data);
//       } catch (error) {
//         console.error('Error fetching menu data:', error);
//       }
//     };

//     fetchMenuData();
//   }, [restaurantId]);

//   const updateMenuData = async () => {
//     try { 

 
//       const menu = [
//     {
//           "category": "Appetizers",
//           "items": [
//             {
//               "name": "Spinach and Artichoke Dip",
//               "price": 9.99,
//               "description": "Creamy spinach and artichoke dip served with tortilla chips.",
//               "rating": 4.5,
//               "isNonVeg": true,
//               "photo_url": "https://images.pexels.com/photos/14530314/pexels-photo-14530314.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
//             },
//             {
//               "name": "Mozzarella Sticks",
//               "price": 8.99,
//               "description": "Golden fried mozzarella sticks served with marinara sauce.",
//               "rating": 4.5,    
//               "isNonVeg": true,          
//               "photo_url": ""
//             }
//           ]
//         },
//         {
//           "category": "Main Courses",
//           "items": [
//             {
//               "name": "Grilled Steak",
//               "price": 19.99,
//               "description": "Juicy grilled steak cooked to perfection, served with mashed potatoes and vegetables."
//               ,
//               "rating": 4.5,    
//               "isNonVeg": true,          
//               "photo_url": ""
//             },
//             {
//               "name": "Seafood Platter",
//               "price": 22.99,
//               "description": "A delicious combination of grilled fish, shrimp, and calamari with garlic butter.",
//               "rating": 4.5,    
//               "isNonVeg": true,          
//               "photo_url": ""
//             }
//           ]
//         },
//         {
//           "category": "Desserts",
//           "items": [
//             {
//               "name": "Chocolate Lava Cake",
//               "price": 7.99,
//               "description": "Warm chocolate cake with a gooey molten center, topped with vanilla ice cream.",
//               "rating": 4.5,    
//               "isNonVeg": true,          
//               "photo_url": ""
//             },
//             {
//               "name": "New York Cheesecake",
//               "price": 8.99,
//               "description": "Classic New York-style cheesecake topped with strawberry compote.",
//               "rating": 4.5,    
//               "isNonVeg": true,          
//               "photo_url": ""
//             }
//           ]
//         }
//   ]
// ;
 
//       // Make a POST request to update the menu data
//       const response = await axios.post(`http://localhost:2000/api/eat_ease/menus`, {
//         restaurant_id: restaurantId,
//         menuData: menu,
//       });

//       console.log('Menu data updated:', response.data);
//     } catch (error) {
//       console.error('Error updating menu data:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 h- ">Menu</h2>

//       {menuItems.map((item) => (
//         <li key={item._id}>
//           {item._id} - {item.restaurant_id}
//         </li>
//       ))}

//       <button onClick={updateMenuData}>Update Menu Data</button>

//       {<p>Hello, this is the menu page for the restaurant.</p>}
//     </div>
//   );
// }

// export default Menu;
