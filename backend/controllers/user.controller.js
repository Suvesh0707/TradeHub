import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export  const registerUser = async(req, res)=>{

    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
           return res.status(400).json({message:"All Fields Are Required"})
        }
        const exisingUser = await User.findOne({email})
        if(exisingUser){
            return res.status(400).json({message:"Email Already In Use"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: "strict"
        });
        return res.status(201).json({message:"user register successfully"})
    } catch (error) {
        return res.status(500).json({message:"Server error",error:error.message})
    }

}

export const loginUser = async(req, res)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24*60*60*1000, 
            sameSite: "strict",
        });

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure:false,
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};