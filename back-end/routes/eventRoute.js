//eventRoute.js Router file
import { createEvent } from "../controllers/handleCreateEvent.js"; //handleCreateEvent from "../controllers/handleCreateEvent.js";
// import { showCreatedEvents } from "../controllers/showCreatedEvents.js";
import {signUpController} from "../controllers/userSignUpController.js";
import {showAllEvents} from "../controllers/showAllEvents.js";
import { handleFileUpload } from "../middleware/fileUpload.js";
// import {authenticateToken} from "../middleware/authenticateToken.js";
// import {authorizeRoles} from "../middleware/authorizeRole.js";
import { Router } from "express";
const router = Router();

//authenticatioToken will only be processed after the token is genearated to the user after password verification
router.post("/create", handleFileUpload, createEvent);  //after logging in and having the token access, need to authorize token
// router.get("/yourevents", showCreatedEvents);
router.get("/allevents", showAllEvents);
router.post("/signup", signUpController);

export default router;