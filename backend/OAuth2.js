const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { getDBConnection } = require('./db');

const router = express.Router();


passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4001/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  let connection;
  try {
    connection = await getDBConnection();

    const result = await connection.execute(
      `SELECT * FROM admin WHERE email = :email`, 
      [profile.emails[0].value]
    );

    if (result.rows.length > 0) {
      return done(null, profile); 
    } else {
      console.log('Email not found in admin table: ', profile.emails[0].value);
      return done(null, false, { message: 'Email not found in the admin table' }); 
    }
  } catch (err) {
    console.error('Database connection error', err);
    return done(err); 
  } finally {
    if (connection) {
      try {
        await connection.close();  
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.send("<a href='/auth/google'>Login with Google</a>");
  }
});

router.get("/auth/google", passport.authenticate("google", { 
  scope: ["profile", "email"], 
  prompt: 'select_account' 
}));

router.get("/auth/google/callback", 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect("http://localhost:5173/home");
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});


router.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.json({
      authenticated: true,
      user: req.user.displayName,
      email: req.user.emails[0].value
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = { authRoutes: router };