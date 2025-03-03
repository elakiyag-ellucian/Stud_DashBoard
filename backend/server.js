const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const oracledb = require('oracledb');
const cors = require('cors');
const { log } = require('console');
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_user,
  password: process.env.DB_password,
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
    const { name, password } = JSON.parse(message);
    console.log(name,password);
    
    try {
      let connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(
        `SELECT * FROM ADMIN_USERS WHERE USERNAME = :name AND PASSWORD = :password AND ROLE = 'ADMIN'`,
        [name, password]
      );
      console.log("result:",result)
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