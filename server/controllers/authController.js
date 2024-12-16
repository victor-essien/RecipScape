import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email) {
    next("Provide Required Fields!");
    return;
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exist");
      return;
    }
    const hashedPassword = await hashString(password);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = createJWT(user?._id);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }
    const user = await Users.findOne({ email }).select("+password");

    const isMatch = await compareString(password, user?.password);
    console.log(isMatch);
    if (!isMatch) {
      next("Invalid email or password");
      return;
    }
    //undefined because we dont want to send the password
    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next("Invalid email or password");
    res.status(404).json({ message: error.message });
  }
};

// export const googleSignIn = async (req, res, next) =>{
//  try {
//     res.header('Access-Control-Allow-Origin','http://localhost:3000')
//     res.header('Referrer-Policy', 'no-referrer-when-downgrade')
//     const redirectUrl = 'http://localhost:3000'

//     console.log('calllelelleleledd')
//     const client = new OAuth2Client(
//         process.env.GOOGLE_CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         redirectUrl
//     )
//     const authorizeUrl =  client.generateAuthUrl ({
//         access_type: 'online',
//         scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
//         prompt: 'consent'
//     })
//     res
//     const  {token} = req.body
//     console.log( process.env.GOOGLE_CLIENT_ID)
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID
//     });
//         const {name, email, picture} = ticket.getPayload()

//         let user = await Users.findOne({ email });

//         if (!user) {
//           // If the user doesn't exist, create a new user
//           const [firstName, lastName] = name.split(" ");
//           user = new Users({
//             firstName,
//             lastName,
//             email,
//             profileUrl: picture, // Store the user's profile picture from Google
//             googleSignedIn: true, // Custom field to indicate Google Sign-In
//           });

//           await user.save();
//         }

//         // Generate JWT for the user
//         const tokend = jwt.sign(
//           { id: user._id, email: user.email },
//           process.env.JWT_SECRET,
//           { expiresIn: '1d' }
//         );

//         res.status(200).json({
//             success: true,
//             token,
//             user: {
//               id: user._id,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               email: user.email,
//               profileUrl: user.profileUrl, // From Google
//             },
//             })
//  } catch (error) {
//     console.log(error)
//     res.status(404).json({ message: error.message })

//  }
// }

//const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.CLIENT_SECRET);

export const googleSignIn = async (req, res, next) => {
  console.log("Google Sign-In route triggered");
  try {
    // Set CORS headers for local development
    res.header("Access-Control-Allow-Origin", "https://recipscape.netlify.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    // Redirect URL that Google will use after authentication
    const redirectUrl = `backendurl/auth/google/callback`; //ADD your backend url

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    // Initialize Google OAuth2 client with credentials
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile ", "email"],
      prompt: "consent",
    });

    res.json({ url: authUrl });
  } catch (error) {
    console.error("Error in Google Sign-In:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuthCallback = async (req, res, next) => {
  const getUserData = async (access_token) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    //console.log('response',response);
    const data = await response.json();
    console.log("data", data);
  };
  const { code } = req.query;
 

  try {
    // Exchange the authorization code for access token and ID token
    const redirectUrl = `backendurl/auth/google/callback`; //ADD your backend url
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    // Use the access token to get user information

    const { tokens } = await oAuth2Client.getToken(code);

    // Make sure to set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(tokens);
    console.log("Tokens acquired.");
    const userd = oAuth2Client.credentials;

    await getUserData(oAuth2Client.credentials.access_token);
    // const tokens = r.tokens

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user info from the token payload
    const payload = ticket.getPayload();

    const {
      email,
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
      picture: profileUrl,
    } = payload;
  
    // Check if the user already exists in the database
    let user = await Users.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new one
      user = await Users.create({
        firstName,
        lastName,
        email,
        profileUrl,
        googleId,
      });
    }

    // Generate JWT (optional: for frontend session management)
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    const userString = Buffer.from(JSON.stringify(user)).toString("base64");

    const redirectUurl = `https://recipscape.netlify.app/authsuccess?token=${token}&user=${userString}`;

    return res.redirect(redirectUurl);

    // res.redirect(
    //   `http://recpst:3000?token=${token}&email=${email}&firstName=${firstName}&lastName=${lastName}`
    // );
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};
