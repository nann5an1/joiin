import {loginModel} from "../models/loginModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export async function loginController(req, res) {
    try {
        // console.log(req.body);
        const result = await loginModel(req.body); //return id, name, password of Login user
        if (result.length === 0)
            return res.status(404).json({message: "user not found"});
        const user = result[0];
        //compare the password string with stored hash password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) 
            return res.status(401).json({ message: "Invalid credentials" });
       
        console.log(process.env.SECRET);
        //password matched
        console.log("password match");
        //sign the token
        const token = jwt.sign(
            {user: user.id}, 
            process.env.SECRET, 
            {expiresIn: '1h'}); //sign the token with the secret key

        console.log("sigined token", token);
        req.session.token = token;
        req.session.user = {id: user.id, username: user.name};
        
        console.log(token);
        console.log(user.name);
        res.status(200).json({
            message: "Login successful",
            user: { id: user.id , username: user.name },
            });
        
    } catch (error) {
         console.error("Login Error:", error);
        res.status(500).json({ message: "Server Login error" });
    }
}