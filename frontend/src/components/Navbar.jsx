import React from 'react';

function Navbar(props) {
  return (
    <div className="h-20 bg-[#0c162c] flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <img src="https://i.pinimg.com/736x/cd/12/b6/cd12b6abe71866fd0d989ba932ec2f94.jpg" alt="Logo" className="h-10 w-10 rounded-3xl" />
        <h1 className="font-bold text-white text-3xl">Trade Hub</h1>
      </div>

      {/* Search Input */}
      <div className='flex flex-row '>

      <input
        className=" bg-white text-black px-4 py-2  sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-3xl
        "
        placeholder="Search here"
        type="text"
        /><svg className='bg-white h-10 w-15 rounded-r-3xl  py-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
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
