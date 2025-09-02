import express from 'express'
import {signUpController} from '../controllers/userSignUpController.js'
import {loginController} from '../controllers/userLoginController.js'
import {logoutController} from '../controllers/userLogoutController.js'
import {organizerCreatedEvents} from '../controllers/showCreatedEvents.js'
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/created_events", authMiddleware ,organizerCreatedEvents);

export default router;