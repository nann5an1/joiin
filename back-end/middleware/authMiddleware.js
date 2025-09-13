// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 🔧 FIXED FUNCTION NAME (was authenticateMiddleWare)
export function authenticateToken(req, res, next) {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        
        console.log("=== AUTH MIDDLEWARE DEBUG ===");
        console.log("All cookies:", req.cookies);
        console.log("Token from cookie:", token);
        // console.log("Cookie header:", req.headers.cookie);
        // console.log("User id:", req.user.id);
        console.log("============================");
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // This will contain { id: user.id }
        console.log("User id:", req.user.id);
        
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(403).json({ message: "Invalid token." });
    }   
}