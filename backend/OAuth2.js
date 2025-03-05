require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;
const oracledb = require('oracledb'); // Import oracledb for DB connection

const app = express();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // Ensure this matches the redirect URI registered in Google Developer Console
  callbackURL: 'http://localhost:4001/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Connect to Oracle DB and check if the user's email exists in the 'admin' table
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER, // Your DB username
      password: process.env.DB_PASSWORD, // Your DB password
      connectString: process.env.DB_HOST, // Your DB connect string (e.g., localhost:1521/orcl)
    });

    const result = await connection.execute(
      `SELECT * FROM admin WHERE email = :email`, 
      [profile.emails[0].value] // Email from the profile
    );

    if (result.rows.length > 0) {
      // If the email exists, pass the profile data to the next step
      return done(null, profile);
    } else {
      // If the email does not exist, send an error message
      console.log('Email not found in admin table: ', profile.emails[0].value);
      return done(null, false, { message: 'Email not found in the admin table' });
    }
  } catch (err) {
    console.error('Database connection error', err);
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is already authenticated, redirect to the profile page
    res.redirect('/profile');
  } else {
    // If not authenticated, show the login button
    res.send("<a href='/auth/google'>Login with Google</a>");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
    prompt: 'select_account' // Forces Google to ask for account selection every time
  })
);

app.get("/auth/google/callback", 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    // Once logged in and validated, it redirects to the profile page
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (req.user) {
    // Display user information once logged in and validated
    res.send(`Welcome ${req.user.displayName}`);
  } else {
    res.redirect('/');
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.listen(4001, () => {
  console.log('Server is running at port 4001');
});
