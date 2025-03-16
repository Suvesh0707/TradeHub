import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

export default function UploadProduct() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
        imagePreview: null
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData({
                ...productData,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in productData) {
            if (key !== 'imagePreview') {
                formData.append(key, productData[key]);
            }
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/v1/uploadproducts', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Product Uploaded:', response.data);
            toast.success(' Product uploaded successfully!');
        } catch (error) {
            console.error('Upload Error:', error.response?.data || error.message);
            toast.error(` Error: ${error.response?.data?.error || 'Failed to upload product'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-extrabold text-blue-400 tracking-wide mb-8">
                Upload Your Product
            </h2>

            <div className="w-full max-w-4xl grid grid-cols-2 gap-10 items-start">
                <div className="space-y-6">
                    {['name', 'price', 'description', 'category'].map((field) => (
                        <div key={field} className="relative">
                            <input
                                type="text"
                                name={field}
                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                value={productData[field]}
                                onChange={handleChange}
                                className="w-full p-4 bg-transparent text-white border-b-2 border-blue-500 focus:outline-none focus:border-pink-500 transition-all placeholder-gray-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    <div className="relative w-full h-60 bg-white/10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-pink-500 transition-all">
                        {productData.imagePreview && (
                            <img
                                src={productData.imagePreview}
                                alt="Preview"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                        )}
                        <label className="flex flex-col items-center gap-3 cursor-pointer z-10">
                            <FaCloudUploadAlt size={48} className="text-blue-400" />
                            <span>Click to Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-bold transition-all ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105'}`}
                    >
                        {loading ? ' Uploading...' : ' Upload Now'}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
