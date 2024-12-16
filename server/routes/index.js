import express from 'express';
import authRoute from './authRoutes.js';
import userRoute from './userRoutes.js'
import postRoute from './postRoutes.js'

const router = express.Router();

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/post', postRoute)

export default router;