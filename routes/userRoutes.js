import express from 'express';
import { login, signup, updateProfile } from '../controllers/userController';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login", login);
userRouter.put("/upadte-profile", protectRoute,updateProfile);
userRouter.get("/check", protectRoute,updateProfile);

export default userRouter;