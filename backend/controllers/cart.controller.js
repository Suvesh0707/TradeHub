import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Please login first to add to cart" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

export const getCartInfo = async (req, res) => {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Please login first to view the cart" });
    }
  
    try {
      const cart = await Cart.findOne({ userId: req.user._id }).populate({
        path: 'products.productId', 
        select: 'name price image' 
      });
  
      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ message: "Your cart is empty" });
      }
  
      res.status(200).json({ cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart data" });
    }
  };

  export const deleteProductFromCart = async (req, res) => {
    const { productId } = req.body;
  
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Please login first to delete from cart" });
    }
  
    try {
      const cart = await Cart.findOne({ userId: req.user._id });
  
      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ message: "Your cart is empty" });
      }
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      cart.products.splice(productIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ error: "Failed to remove product from cart" });
    }
  };
  