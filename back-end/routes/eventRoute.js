//eventRoute.js Router file
import { createEvent } from "../controllers/handleCreateEvent.js"; //handleCreateEvent from "../controllers/handleCreateEvent.js";
import {signUpController} from "../controllers/userSignUpController.js";
import {showAllEvents} from "../controllers/showAllEvents.js";
import {showEventDetails} from "../controllers/showEventDetails.js";
import { handleFileUpload } from "../middleware/fileUpload.js";
import { addInterestedEvents } from "../controllers/postInterestedEventsController.js";
import {addAttendingEvents} from "../controllers/postAttendingEventsController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";
import {postFeaturedEventsController} from "../controllers/postFeaturedEventsController.js";
import {showFeaturedEventsController} from "../controllers/showFeaturedEventsController.js";
import {showSearchEvents} from "../controllers/showSearchEventsController.js";

// import {authorizeRoles} from "../middleware/authorizeRole.js";

import { Router } from "express";
const router = Router();

//authenticatioToken will only be processed after the token is genearated to the user after password verification
//user as an organizer creating an event
router.post("/create", authenticateToken, handleFileUpload, createEvent);  //after logging in and having the token access, need to authorize token
router.post("/signup", signUpController);
router.post("/interested_events", authenticateToken, addInterestedEvents);
router.post("/join_events", authenticateToken, addAttendingEvents); //need to update the joining counter
router.post("/post_featured_events", postFeaturedEventsController); //don't need the frontend since will trigger from the vercel.json

router.get("/allevents", showAllEvents);
router.get("/event_details", showEventDetails);
router.get("/featured_events", showFeaturedEventsController); //get the details of the featured events which are set as bool_featured = true
router.get("/search_events", showSearchEvents);


export default router;