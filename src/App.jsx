import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setitems] = useState([]);
  const [cart, setCart] = useState([]);

  const addedItems = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemove = (idx) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(idx, 1);
      return updatedCart;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setitems(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-900 hover:text-red-700 transition duration-300 ease-in-out mb-8">
        Welcome to the Store
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product List */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-2xl"
              key={product.id}
            >
              <img
                className="h-32 w-32 object-contain mb-4"
                src={product.image}
                alt={product.title}
              />
              <h3 className="h-14 text-sm font-semibold text-gray-800 overflow-hidden">
                {product.title}
              </h3>
              <h2 className="mt-4 text-lg font-bold text-green-600">
                ${product.price}
              </h2>
              <button
                onClick={() => addedItems(product)}
                className="text-white w-full bg-emerald-800 hover:bg-emerald-700 rounded px-6 py-2 mt-4 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 font-medium"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
