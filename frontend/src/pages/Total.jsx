import React, { useState } from 'react'
import PropTypes from 'prop-types'
function Total({ cartItems }) {
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
  return (
    <><div className='flex flex-col items-center md:w-1/2 flex-grow '>
      <div className='flex flex-col align-center hidden  md:block w-full h-auto md:w-full m-2 p-2 text-white bg-gray-900 '>
        <div className='flex m-2 text-xl flex-row justify-evenly  font-bold'>
          <h1>Names</h1>
          <h1>Prices</h1>
        </div>
        <hr className='h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 rounded-full my-2 ' />
        <div className='flex flex-col text-xl  px-4 max-h-150 overflow-x-hidden scrollbar-hidden overflow-scroll scroll  font-bold  md:w-full justify-center items-center content-center'>
          <div className='flex flex-col  h-auto  w-full '>
            {cartItems.map((product, index) => (
              <div key={index} className="flex py-1  flex-row justify-between w-full  ">
                <span>{product.item}</span>
                <span>{product.price} Rs</span>
              </div>

            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full sticky bottom-0 justify-between font-bold items-center p-2 m-1 h-14 text-xl md:w-full bg-gradient-to-tl from-blue-950 text-white to-blue-500'>
        <h1>Total Amount</h1>
        <h1> {totalPrice} /-</h1>
      </div>
    </div>
    </>
  )
}
Total.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired
    })
  ).isRequired,
}

export default Total
