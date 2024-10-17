import express from 'express';
import { deleteUser, getUserProfile, getUsers, loginUser, registerUser, updateUserProfile } from '../../controllers/api/userController.js';
import { authorize, protect } from '../../middlewares/authMiddlewares.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', protect, getUserProfile);
userRouter.put('/profile', protect, updateUserProfile);
userRouter.get('/profile', protect, getUserProfile);
userRouter.get('/users', protect, authorize("admin"), getUsers);
userRouter.delete('/profile/:id', protect, deleteUser);


export default userRouter;