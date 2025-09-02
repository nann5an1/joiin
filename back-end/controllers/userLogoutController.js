
export async function logoutController(req, res) {
    console.log("logoutController is running");
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destroy error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }

            // Clear the session cookie (the server-side session is invalidated but still need to clear for the browser side)
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,   // set to true in production
                sameSite: "lax",
                path: "/",       // match the original cookie path
            });

            console.log("logout successful");
            res.status(200).json({ message: "Logout successful" });
        });
    } catch (error) {
        console.error("Logout controller error:", error);
        res.status(500).json({ message: "Server logout error" });
    }
}
