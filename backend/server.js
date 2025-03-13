require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const http = require('http'); 
const { authRoutes } = require('./OAuth2'); 
const { studentSocket } = require('./studentSocket');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: "secret",  
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.json({
      authenticated: true,
      user: req.user.displayName,
      email: req.user.emails[0].value,
    });
  } else {
    res.json({ authenticated: false });
  }
});

const server = http.createServer(app);

studentSocket({ server });

server.listen(4001, () => {
  console.log('Server is running at port 4001');
});
