import React from 'react';

export default function ProductGrid() {
    const products = [
        { id: 1, name: "Calculator", price: 500, image: "https://helloaugust.in/wp-content/uploads/2020/07/casio-fx-991es-plus-scientific-calculator-2nd-edition.jpg" },
        { id: 2, name: "Notes", price: 300, image: "https://example.com/notes.jpg" },
        { id: 3, name: "Graphics Kit", price: 700, image: "https://example.com/graphics.jpg" },
        { id: 4, name: "Engineering Book", price: 400, image: "https://example.com/book.jpg" },
        { id: 5, name: "Drawing Tools", price: 350, image: "https://example.com/drawing-tools.jpg" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black p-10">
            <h1 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wider">Explore Our Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-gray-900 rounded-2xl p-5 shadow-lg border border-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative">
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg border border-gray-800"
                            />
                        </div>

                        <div className="mt-4 text-white">
                            <h3 className="text-lg font-bold truncate">{product.name}</h3>
                            <p className="text-green-500 font-extrabold text-2xl">₹{product.price}</p>
                            <div className="text-gray-400 text-sm mt-1">'Unknown Location'</div>
                            <p className="text-gray-500 text-xs mt-1">Just Now</p>

                            {/* Buttons Section */}
                            <div className="flex gap-3 mt-4">
                                <button className="flex-1 bg-gradient-to-tl from-blue-950 to-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold tracking-wide transition-all">
                                    Buy Now
                                </button>
                                <button className="flex-1 bg-transparent border border-green-500 text-green-500 py-2 rounded-lg font-bold hover:bg-gradient-to-tl from-green-950 to-green-500  hover:text-white transition-all">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}