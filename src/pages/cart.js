// Cart.js
import React from 'react';

function Cart({ cartItems }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))
        ) : (
          <li>No items in the cart</li>
        )}
      </ul>
    </div>
  );
}

export default Cart;
