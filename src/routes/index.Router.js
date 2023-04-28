import { Router } from "express";
import { signUp,signIn, sessionVerification } from "../controllers/authController.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";
import { signInValidation } from "../middlewares/signInValidation.js";

const router=Router();
router.post('/signIn', signInValidation,signIn);
router.post('/signUp', signUpValidation,signUp);
router.post('/', sessionVerification);
export default router