import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middelware/authMiddelware.js';


const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/test', requireSignIn,isAdmin, testController);


router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok: true});
});

router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok: true});
});

export default router;
