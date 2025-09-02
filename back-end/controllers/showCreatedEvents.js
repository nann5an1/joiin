import createdEventsData from "../models/getCreatedEventsData.js";

export async function organizerCreatedEvents(req, res){
    console.log("Organizer created events controller is running");
    console.log("All cookies in controller:", req.cookies);
    console.log("User from middleware:", req.user);
    
    try {
        // Get user_id from the decoded JWT token (set by authMiddleware)
        const user_id = req.user.id; // or req.user.user_id, depending on your JWT payload structure
        
        console.log("User ID:", user_id);
        
        const result = await createdEventsData(user_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in organizerCreatedEvents:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}