import express from 'express'
import {signUpController} from '../controllers/userSignUpController.js'
import {loginController} from '../controllers/userLoginController.js'
import {logoutController} from '../controllers/userLogoutController.js'

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;