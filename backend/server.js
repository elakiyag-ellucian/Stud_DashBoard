// backend/server.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const http = require('http'); // Import the HTTP module to create a server
const { authRoutes } = require('./OAuth2'); // OAuth2 routes
const { studentSocket } = require('./studentSocket'); // WebSocket logic

const app = express();

// Set up CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,
}));

// Session setup
app.use(session({
  secret: "secret",  
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Use OAuth2 routes
app.use(authRoutes);

// API to check authentication status
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

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Pass the HTTP server to studentSocket to handle WebSocket connections
studentSocket({ server });

// Start the server
server.listen(4001, () => {
  console.log('Server is running at port 4001');
});
