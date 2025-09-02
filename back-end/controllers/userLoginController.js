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
       
        // FIXED: Change the JWT payload structure
        const token = jwt.sign(
            { id: user.id }, // Changed from {user: user.id} to {id: user.id}
            process.env.SECRET,
            { expiresIn: '1h' }
        );
        
        // FIXED: Add domain specification for cross-port cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,     // set true in production (https)
            sameSite: "lax",
            maxAge: 1000 * 60 * 60, // 1 hour
            domain: 'localhost'  // Add this for cross-port cookies
        });
       
        console.log("Cookie set with token:", token);
        
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: { id: user.id, username: user.name },
        });
       
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Login error" });
    }
}