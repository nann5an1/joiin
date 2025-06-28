import express from 'express'
import {signUpController} from '../controllers/userSignUpController.js'
import {loginController} from '../controllers/userLoginController.js'

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;