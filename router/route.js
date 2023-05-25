import { Router } from "express";
const router = Router();

// import all controllers
import * as controller from '../controllers/appController.js'
import {registerMail} from '../controllers/realmailer.js'
import Auth, {localVariables} from "../middleware/auth.js";

// Post Methods
// router.route('/register').post((req, res)=> res.json('Register route')) //register user
router.route('/register').post(controller.register) //register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
// router.route('/post/upload').post(Auth, postcontroller.createPost)

// Get Methods
router.route('/user/:username').get(controller.getUser); //user with usernme
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP); //generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); //verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); //reset all the variables
router.route('/all-users').get(controller.getAllUsers);

// Put Methodspost
// router.route('/updateuser').put(Auth, controller.updateUser); // is ue to update the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // use to reset passsword

export default router;