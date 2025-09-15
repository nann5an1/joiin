import express from 'express'
import {signUpController} from '../controllers/userSignUpController.js'
import {loginController} from '../controllers/userLoginController.js'
import {logoutController} from '../controllers/userLogoutController.js'
import {organizerCreatedEvents} from '../controllers/showCreatedEvents.js'
import { authenticateToken } from "../middleware/authMiddleware.js";
import {showInterestedEvents} from "../controllers/showInterestedEventsController.js"
import {removeInterestedEvents} from "../controllers/delInterestedEventsController.js"
import {removeAttendingEvents} from "../controllers/delAttendingEventsController.js"
import {showAttendingEvents} from "../controllers/showAttendingEventsController.js"

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);

//user as an organizer getting his created events
router.get("/created_events", authenticateToken ,organizerCreatedEvents);
router.get("/interested_events", authenticateToken , showInterestedEvents);
router.get("/attend_events", authenticateToken , showAttendingEvents);


router.delete("/del_interested_event", authenticateToken, removeInterestedEvents);
router.delete("/remove_attending_events", authenticateToken, removeAttendingEvents);


export default router;