import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting to checkout...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative" ref={cartRef}>
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
        </button>
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length < 1 ? (
          <div className="text-center">
            <AiOutlineShopping className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="mb-4">Your shopping bag is empty</p>
            <Link href="/">
              <a className="text-blue-500 hover:underline">Continue Shopping</a>
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div className="flex items-center justify-between" key={item._id}>
                  <div className="flex items-center space-x-4">
                    <img src={urlFor(item?.image[0])} alt={item.name} className="w-16 h-16 object-cover" />
                    <div>
                      <p className="text-gray-800 font-semibold">{item.name}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-gray-600">{item.quantity}</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-600"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-gray-800 font-semibold">Subtotal:</p>
              <p className="text-gray-800 font-semibold">${totalPrice}</p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
