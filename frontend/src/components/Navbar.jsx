import { Search } from 'lucide-react';
import React from 'react';

function Navbar(props) {
  return (
    <div className="h-20 bg-[#0c162c] flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <img src="https://i.pinimg.com/736x/cd/12/b6/cd12b6abe71866fd0d989ba932ec2f94.jpg" alt="Logo" className="h-10 w-10 rounded-3xl" />
        <h1 className="font-bold text-white text-3xl">Trade Hub</h1>
      </div>
      <div className='flex flex-row '>

      <input
        className=" bg-white text-black px-4 py-2  sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-3xl
        "
        placeholder="Search here"
        type="text"
        /><Search className=' bg-white h-10 w-10 rounded-r-3xl p-2'/>
      <div className="flex items-center text-center">
        {props.isLoggedin ? (
            <h2 className=" text-2xl font-bold text-amber-50 px-10">
            <span className="text-blue-500">Dashbord</span>
          </h2>
        ) : (
            <h2 className="text-blue-500 px-10 text-2xl font-bold">
            Login
          </h2>
        )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
