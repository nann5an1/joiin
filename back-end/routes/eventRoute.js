//eventRoute.js Router file
import { createEvent } from "../controllers/handleCreateEvent.js"; //handleCreateEvent from "../controllers/handleCreateEvent.js";
import {signUpController} from "../controllers/userSignUpController.js";
import {showAllEvents} from "../controllers/showAllEvents.js";
import {showEventDetails} from "../controllers/showEventDetails.js";
import { handleFileUpload } from "../middleware/fileUpload.js";
import { addInterestedEvents } from "../controllers/postInterestedEventsController.js";
import {addAttendingEvents} from "../controllers/postAttendingEventsController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

// import {authorizeRoles} from "../middleware/authorizeRole.js";

import { Router } from "express";
const router = Router();

//authenticatioToken will only be processed after the token is genearated to the user after password verification
//user as an organizer creating an event
router.post("/create", authenticateToken, handleFileUpload, createEvent);  //after logging in and having the token access, need to authorize token
router.post("/signup", signUpController);
router.post("/interested_events", authenticateToken, addInterestedEvents);
router.post("/join_events", authenticateToken, addAttendingEvents);

router.get("/allevents", showAllEvents);
router.get("/event_details", showEventDetails);

// router.get("/yourevents", showCreatedEvents);
// Add this to your routes for testing
// router.get("/test-auth", authenticateToken, (req, res) => {
//     res.json({ 
//         message: "Authentication successful!", 
//         user: req.user,
//         cookies: req.cookies 
//     });
// });

export default router;