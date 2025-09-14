import express from 'express'
import {signUpController} from '../controllers/userSignUpController.js'
import {loginController} from '../controllers/userLoginController.js'
import {logoutController} from '../controllers/userLogoutController.js'
import {organizerCreatedEvents} from '../controllers/showCreatedEvents.js'
import { authenticateToken } from "../middleware/authMiddleware.js";
import {showInterestedEvents} from "../controllers/showInterestedEventsController.js"

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);

//user as an organizer getting his created events
router.get("/created_events", authenticateToken ,organizerCreatedEvents);
router.get("/interested_events", authenticateToken , showInterestedEvents);

export default router;