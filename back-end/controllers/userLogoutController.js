
export async function logoutController(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, //false for now since testing on local host
            samesite: "lax",
        });
        res.status(201).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json(error);
    }
}