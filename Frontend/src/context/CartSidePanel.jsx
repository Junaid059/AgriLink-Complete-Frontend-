import React, { useState } from 'react';

const ShoppingCartPanel = () => {
  const [quantity, setQuantity] = useState(2);

  // Function to increment quantity
  const handleIncrease = () => setQuantity(quantity + 1);

  // Function to decrement quantity
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <section className="h-full bg-gray-100">
      <div className="container mx-auto py-5">
        <div className="flex justify-center items-center h-full">
          <div className="w-10/12">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-normal text-xl">Shopping Cart</h3>
              <div>
                <p className="mb-0 text-sm text-gray-600">
                  Sort by:
                  <a href="#!" className="text-blue-600">
                    {' '}
                    price <i className="fas fa-angle-down mt-1"></i>
                  </a>
                </p>
              </div>
            </div>

            {/* Cart Item 1 */}
            <div className="card rounded-lg mb-4 shadow-md">
              <div className="card-body p-4">
                <div className="flex justify-between items-center">
                  <div className="w-1/5">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                      className="img-fluid rounded-lg"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div className="w-2/5">
                    <p className="font-semibold">Basic T-shirt</p>
                    <p className="text-sm text-gray-600">
                      Size: M <span className="text-gray-400">Color: Grey</span>
                    </p>
                  </div>
                  <div className="flex w-1/5 justify-center items-center">
                    <button className="text-gray-500" onClick={handleDecrease}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min="0"
                      className="w-12 text-center mx-2 border-gray-300"
                    />
                    <button className="text-gray-500" onClick={handleIncrease}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="w-1/5">
                    <h5 className="font-semibold">$499.00</h5>
                  </div>
                  <div className="w-1/12 text-right">
                    <button className="text-red-600">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Discount Code */}
            <div className="card rounded-lg mb-4 shadow-md">
              <div className="card-body p-4 flex items-center">
                <div className="w-3/4">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Discount Code"
                  />
                </div>
                <button className="btn btn-outline-warning ml-3 bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="card rounded-lg shadow-md">
              <div className="card-body p-4 text-center">
                <button className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600">
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartPanel;
