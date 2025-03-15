
import React, { useState } from 'react';
import Cart from './Cart';  // ✅ Import Cart Component
import Total from './Total'; 
function CartPage() {
  const [cartItems, setCartItems] = useState([
    { img: "https://i.pinimg.com/474x/e7/bb/d7/e7bbd7501f7b4ce5ad2faa3777c7a5f0.jpg", item: "Pink Calculator", price: 200 },
    { img: "https://i.pinimg.com/236x/fe/b7/7b/feb77b96939f334394f0c1c460e2be44.jpg", item: "Black Calculator", price: 900 },
    { img: "https://i.pinimg.com/236x/20/ab/16/20ab165c489780d79aa0654e6ef8e8ca.jpg", item: "Maths Notes", price: 300 },
    { img: "https://i.pinimg.com/474x/e7/bb/d7/e7bbd7501f7b4ce5ad2faa3777c7a5f0.jpg", item: "casio Calculator", price: 700 },
    { img: "https://i.pinimg.com/236x/fe/b7/7b/feb77b96939f334394f0c1c460e2be44.jpg", item: "Calculator", price: 200 },
    { img: "https://i.pinimg.com/236x/20/ab/16/20ab165c489780d79aa0654e6ef8e8ca.jpg", item: "BEE Notes", price: 400 },
  ]);
  const removeItem = (itemName) => {
    setCartItems((prevItems) => prevItems.filter((product) => product.item !== itemName));
};
  return (
    <div className='flex px-10 flex-col lg:px-40 md:flex-row justify-center h-screen w-full  bg-gradient-to-tl from-blue-950 to-black md:gap-2'>
      <div className=' flex flex-col justify-top md:w-1/2 h-screen scrollbar-hidden w-full overflow-x-hidden overflow-scroll  items-center scrollbar-thumb'>
      {cartItems.map((product, index) => (
                    <Cart key={index} {...product} removeItem={removeItem} /> 
                ))}
      </div>
      <Total cartItems={cartItems} />
    </div>
  )
}

export default CartPage
