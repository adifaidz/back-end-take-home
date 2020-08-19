import express from "express";
import Auth from './../auth';
import { validateUser, handleValidate, checkEmail } from './../validator';
import { register, login, logout } from "./../controllers/authController";

const router = express.Router();

router.post('/register', validateUser, checkEmail, handleValidate, Auth.authenticate('signup', { session: false }), register);
router.post('/login', validateUser, handleValidate, login);
router.get('/logout', Auth.authenticate('jwt', { session : false }), logout);

export default router;