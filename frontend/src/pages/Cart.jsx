import React,{useState} from 'react'
import PropTypes from 'prop-types'
function Cart({img,item,price,removeItem}) {
   

    return (
        <div className='flex flex-row w-full h-40 md:w-full m-2 p-2 bg-gray-900 shadow-xl'>
            <img className=' min-w-28 max-w-28 sm:min-w-30 sm:max-w-40' src={img} alt={item} />
            <div className='flex flex-col justify-center m-5'>
                <h1 className='text-2xl font-bold text-white font-white'>{item}</h1>
                <h2 className='text-xl font-bold text-green-400' >{price} Rs</h2>
                
                <div className='flex flex-row gap-4 m-2'>
                    <button className='bg-blue-700 text-white rounded-2xl h-10 w-20 font-bold'>Buy</button>
                    <button
                        className="bg-red-500 text-white rounded-2xl h-10 w-20 font-bold"
                        onClick={() => removeItem(item)} 
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}
Cart.propTypes = {
    img: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    removeItem: PropTypes.func.isRequired, // Required function
};

export default Cart


