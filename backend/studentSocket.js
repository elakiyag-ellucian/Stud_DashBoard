const WebSocket = require('ws');
const { getDBConnection } = require('./db');

const studentSocket = ({ server }) => {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
      const requestData = JSON.parse(message);
      const { terms, c_level, crn } = requestData; // Receive terms, c_level (UG/PG), and CRN from frontend
      console.log('Parameters:', { terms, crn, c_level });

      // Check if terms, c_level, and crn are provided
      if (terms && c_level && crn) {
        try {
          const connection = await getDBConnection();

          // Adjust the query to filter by terms, c_level (UG/PG), and CRN
          const query = `
            SELECT 
              SSBSECT.SSBSECT_MAX_ENRL AS MAX_SEATS, 
              SSBSECT.SSBSECT_ENRL AS TOTAL_REG, 
              SSBSECT.SSBSECT_SEATS_AVAIL AS AVL_SEATS,
              SFTREGS.SFTREGS_HOLD_LEVL_CODE AS HOLD_LEVEL
            FROM ssbsect
            INNER JOIN sftregs ON ssbsect.SSBSECT_TERM_CODE = sftregs.SFTREGS_TERM_CODE
            WHERE 
              ssbsect.SSBSECT_TERM_CODE = :terms 
              AND ssbsect.SSBSECT_CRN = :crn 
              AND sftregs.SFTREGS_LEVL_CODE = :c_level
          `;

          console.log('Query:', query);
          console.log('Parameters:', { terms, crn, c_level });

          // Execute the query with bound variables
          const result = await connection.execute(query, {
            terms: terms,    // Bind terms to :terms
            crn: crn,        // Bind crn to :crn
            c_level: c_level // Bind c_level to :c_level
          });

          console.log('Result from DB:', result); // Debugging: Log the result

          // Check the result of the query
          if (result.rows && result.rows.length > 0) {
            // If data found, send it back to the frontend
            const row = result.rows[0]; // Get the first row
            const studentCountData = {
              terms,           // Send terms back to frontend
              crn,             // Send crn back to frontend
              c_level,         // Send c_level back to frontend
              maxSeats: row[0], // Correctly access the value at index 0 for MAX_SEATS
              totalReg: row[1], // Correctly access the value at index 1 for TOTAL_REG
              availableSeats: row[2], // Correctly access the value at index 2 for AVL_SEATS
            };

            console.log('Sending student count data:', studentCountData); // Debugging: Check the data being sent
            ws.send(JSON.stringify({ studentCount: studentCountData }));
          } else {
            // If no data found
            ws.send(JSON.stringify({ error: 'No data found for the given filters' }));
          }
        } catch (err) {
          // Handle any database or server error
          console.error('Error fetching student count:', err);
          ws.send(JSON.stringify({ error: 'Error fetching student count' }));
        }
      } else {
        // Handle missing parameters from the frontend
        ws.send(JSON.stringify({ error: 'Missing required parameters' }));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  // Handle WebSocket upgrade
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
};

module.exports = { studentSocket };
