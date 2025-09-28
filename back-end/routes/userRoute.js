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
import {setMFAController} from "../controllers/setMFAController.js"
import {isEnabledMFA} from "../controllers/isEnabledMFAController.js"
import {verifyMFA} from "../controllers/verifyMFAController.js"
import {deleteAccountController} from "../controllers/deleteAccountController.js"
import {fetchEventCountController} from "../controllers/fetchEventCountController.js"
import {delCreatedEventController} from "../controllers/delCreatedEventController.js"
import {updateProfileController} from "../controllers/updateProfileController.js"
import {fetchBriefProfileController} from "../controllers/fetchBriefProfileController.js"
import {updatePasswordController} from "../controllers/updatePasswordController.js"

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login",loginController); //verify the MFA if user has MFA enabled
router.post("/logout", logoutController);
router.post("/setMFA", authenticateToken, setMFAController); //set the MFA generate secret code after the user has successfully logined
router.post("/deleteAccount", authenticateToken, deleteAccountController);
router.post("/updateProfile", authenticateToken, updateProfileController); 
router.post("/updatePassword", authenticateToken, updatePasswordController);

//user as an organizer getting his created events
router.get("/created_events", authenticateToken ,organizerCreatedEvents);
router.get("/interested_events", authenticateToken , showInterestedEvents);
router.get("/attend_events", authenticateToken , showAttendingEvents);
router.get("/isEnabledMFA", authenticateToken, isEnabledMFA);
router.get("/verifyMFA", authenticateToken, verifyMFA); //this will check if the user has MFA enabled and if yes, will verify the MFA
router.get("/totalEventCount", authenticateToken, fetchEventCountController);
router.get("/briefProfile", authenticateToken, fetchBriefProfileController);

router.delete("/del_interested_event", authenticateToken, removeInterestedEvents);
router.delete("/remove_attending_events", authenticateToken, removeAttendingEvents);
router.delete("/del_created_event", authenticateToken, delCreatedEventController);

export default router;