import express from "express";
import Auth from './../auth';
import authController from "./../controllers/authController";

const router = express.Router();

router.post('/register', Auth.authenticate('signup', { session: false }), authController.register);
router.post('/login', authController.login);
router.get('/logout', Auth.authenticate('jwt', { session : false }), authController.logout);

export default router;