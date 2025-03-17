import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
export const uploadProduct = async(req, res)=>{
    const {name, price, description, category} = req.body
    const image = req.file ? `${req.file.destination}${req.file.filename}`:'';

    if(!req.user || !req.user._id){
        return res.status(401).json({error:"Please login first to upload products"})
    }
    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        console.log(req.file)
        const productImage = await cloudinary.uploader.upload(image)
        // console.log(productImage)
        const newProduct = new Product({
            name,
            price,
            image: productImage.url,
            description,
            category,
            userId: req.user._id 
        });

        await newProduct.save();
        res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload product" });
    }
}

export const getProduct = async(req, res)=>{
    try {
        const userProducts = await Product.find({ userId: req.user._id });
        res.status(200).json(userProducts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch your products" });
    }
}

export const deleteProduct = async(req, res)=>{
    const {productId} = req.params;

    try {
        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized to delete this product" });
        }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch all products" });
    }
};
