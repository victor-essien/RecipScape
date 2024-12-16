import mongoose from "mongoose";
import Users from "../models/userModel.js";
import PasswordReset from "../models/passwordReset.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { resetPasswordLink, sendNomail } from "../utils/sendEmail.js";

export const requestResetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Email address not found",
      });
    }

    const existingRequest = await PasswordReset.findOne({ email });

    if (existingRequest) {
      const { expiresAt } = existingRequest;

      if (expiresAt < Date.now()) {
        await PasswordReset.findOneAndDelete({ email });
      } else {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent to your email.",
        });
      }
    }
    // await sendNomail()
    await resetPasswordLink(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      const message = `Invalid password reset link. Try again`;
      res.redirect(
        `/users/resetpassword?type=reset&status=error&message = ${message}`
      );
    }

    const resetPassword = await PasswordReset.findOne({ userId });
    if (!resetPassword) {
      const message = `Invalid password reset link. Try again`;
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = `Reset Password link has expired. Please try again`;
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = "Invalid reset password link. Please try  again";
        res.redirect(`/users/resetpassword?status=error&message= ${message}`);
      } else {
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const hashedPassword = await hashString(password);

    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
    console.log(user);
    if (user) {
      await PasswordReset.findOneAndDelete({ userId });
      const message = "Password successfully reset.";
      console.log("Redirecting to success page...");
      res.status(200).json({
        message,
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user; // This is the logged in user..

    const { id } = req.params;

    const user = await Users.findById(id ?? userId).populate([
      { path: "followers", select: "-password" },
      { path: "following", select: "-password" },
    ]);

    if (!user) {
      next("User not found");
      return;
    }
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "Successful",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, profileUrl, profession, location } =
      req.body;

    if (!(firstName || lastName || userName || profession || location)) {
      next("Please provide all the required fields");
      return;
    }
    const { userId } = req.body.user;
    const existingUser = await Users.findOne({ userName: userName });

    if (existingUser) {
      // If the username exists, return an error response
      return res.status(400).json({ message: "Username has been used." });
    }
    const updateUser = {
      firstName,
      lastName,
      userName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    await user.populate([
      { path: "followers", select: "-password" },
      { path: "following", select: "-password" },
    ]);
    const token = createJWT(user?._id);
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const followAction = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { followId } = req.body;

    const user = await Users.findById(userId).populate("following");
    const followUser = await Users.findById(followId).populate("followers");
    if (!user.following.includes(followId)) {
      // Add followUser to the 'following' list of the user
      user.following.push(followId);

      followUser.followers.push(userId);

      await user.save();
      await followUser.save();
      return res.status(200).json({
        success: true,
        message: `You are now following ${followUser.userName}`,
        user,
        followUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
export const unfollowAction = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { followId } = req.body;

    const followUser = await Users.findById(followId).populate("followers");

    await Users.updateOne(
      { _id: userId }, // Find the user by ID
      { $pull: { following: followId } } // Remove the followId
    );
    await Users.updateOne(
      { _id: followId }, // Find the user by ID
      { $pull: { followers: userId } } // Remove the followId
    );
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error occurred", error });
  }
};

export const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await Users.findById(id);
    user.views.push(userId);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const fetchFollowers = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    const followersData = await Users.findById(userId, "followers").populate({
      path: "followers",
      select: "firstName lastName profileUrl location userName -password", // Specify fields you need for each follower
    });

    // Return only the populated followers array

    res.status(201).json({
      success: true,
      message: "Sucessful",
      followersData,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const fetchFollowing = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    const followingData = await Users.findById(userId, "following").populate({
      path: "following",
      select: "firstName lastName profileUrl location userName -password", // Specify fields you need for each follower
    });

    res.status(201).json({
      success: true,
      message: "Sucessful",
      followingData,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
