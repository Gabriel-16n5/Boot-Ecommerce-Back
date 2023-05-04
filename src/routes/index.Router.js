import { Router } from "express";
import { signUp,signIn } from "../controllers/authController.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";
import { signInValidation } from "../middlewares/signInValidation.js";
import { getProducts } from "../controllers/productsController.js";
import { postProducts } from "../controllers/productsController.js";
import { productsValidation } from "../middlewares/productsValidation.js";

const router=Router();
router.post('/signin', signInValidation,signIn);
router.post('/signup', signUpValidation,signUp);
router.get('/products', getProducts);
router.post('/products',productsValidation,postProducts );

export default router