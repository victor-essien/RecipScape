import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import PasswordReset from "../models/passwordReset.js";
import { hashString } from "./index.js";
dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // Correct SMTP host for Outlook
  // true for 465, false for other ports

  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendNomail = async (user, res) => {
  transporter.sendMail(
    {
      from: `"Test" <${AUTH_EMAIL}>`,
      to: "victorsamuel2810@gmail.com",
      subject: "Test Email",
      text: "This is a test email.",
    },
    (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
export const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;

  const token = _id + uuidv4();
  const link = APP_URL + "users/reset-password/" + _id + "/" + token;

  const mailOptions = {
    from: `"RecipScape" <${AUTH_EMAIL}>`,
    to: email,
    subject: "Password Reset",
    html: `<div
      style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
      <h3 style="color: rgb(8, 56, 188)">Reset your password</h3>
      <hr>
    
      <p>
          Please click on the link to reset your password.
          <br>
      <p>This link <b>expires in 10 minutes</b></p>
      <br>
      <a href=${link}
          style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Reset
          Password</a>
      </p>
      <div style="margin-top: 20px;">
          <h5>Best Regards</h5>
          <h5>RecipScape Team</h5>
      </div>
  </div>`,
  };
  try {
    const hashedToken = await hashString(token);

    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    console.log("resetemail", resetEmail);

    if (resetEmail) {
      transporter
        .sendMail(mailOptions)
        .then((info) => {
          if (info) {
            console.log("Email sent: " + info.response);
          } else {
          }
          res.status(201).send({
            success: "PENDING",
            message: "Reset Password Link has been sent to your account.",
          });
        })
        .catch((err) => {
          console.error("Error sending email:", err);
          // res.status(404).json({ message: "Something went wrong", error: err });
          PasswordReset.findOneAndDelete({ email }).then(() => {
            res.status(404).send({
              success: "PENDING",
              message: "Error. Try again later.",
            });
          });
        });

      // transporter
      //   .sendMail(mailOptions)
      //   .then(() => {
      //     res.status(201).send({
      //       success: "PENDING",
      //       message: "Reset Password Link has been sent to your account.",
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(404).json({ message: "Something went wrong" });
      //   });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
