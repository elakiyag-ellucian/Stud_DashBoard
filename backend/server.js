const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const oracledb = require('oracledb');
const cors = require('cors');
<<<<<<< HEAD
require('dotenv').config();
=======
const { log } = require('console');
require("dotenv").config();
>>>>>>> c2635c1c76f2422e423636c4f7bed3f93946f293

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_HOST,
};

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
<<<<<<< HEAD
    const { username, password } = JSON.parse(message); 
=======
    const { name, password } = JSON.parse(message);
    console.log(name,password);
    
>>>>>>> c2635c1c76f2422e423636c4f7bed3f93946f293
    try {
      let connection = await oracledb.getConnection(dbConfig);
      console.log("Successfully connected to the database");
      const result = await connection.execute(
        `SELECT * FROM ADMIN_USERS WHERE USERNAME = :name AND PASSWORD = :password AND ROLE = 'ADMIN'`,
        [name, password]
      );
<<<<<<< HEAD
        console.log(result);
=======
      console.log("result:",result)
>>>>>>> c2635c1c76f2422e423636c4f7bed3f93946f293
      if (result.rows.length > 0) {
        ws.send(JSON.stringify({ success: true, message: 'Login successful' }));
      } else {
        ws.send(JSON.stringify({ success: false, message: 'Invalid credentials or not an admin' }));
      }

      await connection.close();
    } catch (err) {
      console.error('Database error:', err);
      ws.send(JSON.stringify({ success: false, message: 'Database error' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on ws://localhost:4000');
});

