import jwt from "jsonwebtoken";


export function authMiddleware(req, res, next) {
    console.log("authMiddleware is running");
    console.log("All cookies:", req.cookies);
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded", decoded);
    console.log("token", token);
    req.user = decoded; // save user data for later use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
