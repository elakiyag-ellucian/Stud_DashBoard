// backend/studentSocket.js
const WebSocket = require('ws');
const { getDBConnection } = require('./db');

// WebSocket logic for fetching student count
const studentSocket = ({ server }) => {
  const wss = new WebSocket.Server({ noServer: true });

  // When a client connects
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Handle incoming messages from the client
    ws.on('message', async (message) => {
      if (message === 'getStudentCount') {
        try {
          const connection = await getDBConnection();
          const result = await connection.execute('SELECT COUNT(*) AS student_count FROM students');
          
          if (result.rows.length > 0) {
            // Send the student count to the client
            ws.send(JSON.stringify({ studentCount: result.rows[0].STUDENT_COUNT }));
          }
        } catch (err) {
          console.error('Error fetching student count:', err);
          ws.send(JSON.stringify({ error: 'Error fetching student count' }));
        }
      }
    });

    // Handle client disconnection
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  // Handle WebSocket upgrade on the HTTP server
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
};

module.exports = { studentSocket };
