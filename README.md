# RecipScape
***
 **Recipscape**  a food inspired social media project where like minds share recipes and connect..

## Features
***
- Create Post
- Google Autherntication
- Change Password
- Follow Users
- Like Post
- Bookmark Post
- Comment on Post
- Search for post

## Live Demo
***
Checkout the live application [here](https://recipscape.netlify.app)

## Technologies Used 
***
- ** Frontend: ** React, TailwindCSS
- ** Backend: ** Nodejs, Express
- ** Database: ** MongoDB
- ** Authentication: ** JWT Auth, Google Authentication
- ** Image Hosting: ** Cloudinary
- ** Text Editing: ** QuillJs (for our post creation)
- ** Hosting: ** Render(for backend), Netlify(for frontend)
## Instructions
***
#### Backend
Firstly move to the server directory eg: cd server

Create a .env file The .env file will contain the following: 
-  MONGODB_URL = database connection string
-  JWT_SECRET_KEY = your secrete key
-   PORT = 8800
-   GOOGLE_CLIENT_ID = your google client id (for the google authentication)
-   CLIENT_SECRET  = your client secret (for the google authentication)
-  AUTH_EMAIL= email address
-  AUTH_PASSWORD=email access password
-   APP_URL = http://localhost:8800/
Also, chnage API_URL when you deploy your app else use localhost with the appropriate port number

Run npm install to install the packages

Run npm start to start the server

#### Frontend

The client or frontend also has .env filde in the root folder. Create an environment variable of name REACT_APP_CLOUDINARY_ID. This will store the cloudinary cloud name, GOOGLE_CLIENT_ID = your google client id (for the google authentication),  CLIENT_SECRET  = your client secret (for the google authentication)
