import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import {
  createBookmark,
  commentPost,
  createRecp,
  getComment,
  getComments,
  getRecp,
  getRecps,
  getUserRecp,
  likeRecp,
  search,
  viewBookmarks,
  getReplies,
  postReply,
  likeRecpComments,
} from "../controllers/postController.js";

const router = express.Router();

//CREATE POST
router.post("/create-recp", userAuth, createRecp);
router.post("/bookmark/:pid", userAuth, createBookmark);
router.post("/get-user-post/:id", userAuth, getUserRecp);
router.post("/bookmarks", userAuth, viewBookmarks);
router.post("/like/:id", userAuth, likeRecp);
router.post("/like-comment/:commentId/:rid?", userAuth, likeRecpComments);

//GET POST
router.post("/", userAuth, getRecps);
router.post("/:username?/:id", userAuth, getRecp);

//SEARCH
router.get("/search", search);

//COMMENTS
router.post("/comment/:username/:id", userAuth, commentPost);

router.post("/comments/:username/:postId", userAuth, getComments);

router.post("/get-comment/comment/:cId", userAuth, getComment);

//REPLIES
router.post("/commet/getreplies/:commentId", userAuth, getReplies);

router.post("/addreply/comment/:commentId", userAuth, postReply);

export default router;
