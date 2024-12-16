import express from 'express'
import path from 'path'

import { requestResetPassword, resetPassword, changePassword, unfollowAction, fetchFollowers, fetchFollowing } from '../controllers/userController.js';
import { userAuth } from '../middleware/authMiddleware.js';
import { getUser, updateUser, followAction } from '../controllers/userController.js';
const router = express.Router();
const __dirname = path.resolve(path.dirname(""))

router.post("/request-passwordreset", requestResetPassword);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/resetpassword", changePassword)



// Users Routes
router.post('/get-user/:id?', userAuth, getUser)
router.put('/update-user', userAuth, updateUser)

// follow action
router.post("/follow-user", userAuth, followAction);
router.post("/unfollow-user", userAuth, unfollowAction);
router.get('/resetpassword', (req, res) => {
    res.sendFile(path.join(__dirname, "./form/build", "index.html"))
})

//fetch follow
router.post("/fetch-followers", userAuth, fetchFollowers)
router.post("/fetch-following", userAuth, fetchFollowing)
export default router 