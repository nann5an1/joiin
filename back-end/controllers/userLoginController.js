// controllers/loginController.js
import {loginModel} from "../models/loginModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function loginController(req, res) {
    try {
        const result = await loginModel(req.body);
        if (result.length === 0)
            return res.status(404).json({message: "user not found"});
       
        const user = result[0];
       
        // Compare the password string with stored hash password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
       
        // Create JWT token
        const token = jwt.sign(
            { id: user.id }, 
            process.env.SECRET,
            { expiresIn: '1h' }
        );
       
        // 🔧 IMPROVED: Better cookie settings for development
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,         // false for development (http), true for production (https)
            sameSite: "lax",       // helps with cross-origin requests
            maxAge: 1000 * 60 * 60, // 1 hour
            path: "/",             // available for all paths
            // Remove domain for localhost development
        });
       
        console.log("Cookie set with token:", token);
       
        res.status(200).json({
            message: "Login successful",
            token: token, // Optional: you can remove this for production
            user: { id: user.id, username: user.name },
        });
       
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Login error" });
    }
}