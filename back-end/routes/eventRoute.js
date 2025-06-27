//eventRoute.js Router file
import { createEvent } from "../controllers/handleCreateEvent.js"; //handleCreateEvent from "../controllers/handleCreateEvent.js";
import { showCreatedEvents } from "../controllers/showCreatedEvents.js";
import {signUpController} from "../controllers/userSignUpController.js";
import {authenticateToken} from "../middleware/authenticateToken.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";
import { Router } from "express";
const router = Router();

//authenticatioToken will only be processed after the token is genearated to the user after password verification
router.post("/create", authenticateToken, createEvent); 
router.get("/yourevents", showCreatedEvents);
router.post("/signup", signUpController);

export default router;