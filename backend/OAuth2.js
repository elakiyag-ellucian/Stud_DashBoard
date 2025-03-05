require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;
const oracledb = require('oracledb'); // Import oracledb for DB connection
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

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
  callbackURL: 'http://localhost:4001/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_HOST,
    });

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
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.send("<a href='/auth/google'>Login with Google</a>");
  }
});

app.get("/auth/google", passport.authenticate("google", { 
  scope: ["profile", "email"], 
  prompt: 'select_account' 
}));

app.get("/auth/google/callback", 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect("http://localhost:5173/home");
  }
);

app.get("/profile", (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.displayName}`);
  } else {
    res.redirect('/');
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

// New API to check authentication status
app.get('/api/auth/check', (req, res) => {
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

app.listen(4001, () => {
  console.log('Server is running at port 4001');
});
