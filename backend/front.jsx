import React, { useState, useEffect } from 'react';

const App = () => {
  const [terms, setTerms] = useState('');
  const [c_level, setCLevel] = useState('');
  const [crn, setCrn] = useState('');
  const [studentCount, setStudentCount] = useState(null);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null); // State to store WebSocket connection

  // WebSocket connection for receiving data
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000'); // WebSocket server URL

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.studentCount) {
        setStudentCount(data.studentCount);
        setError(null); // Reset any previous errors
      } else if (data.error) {
        setError(data.error);
        setStudentCount(null); // Reset student count on error
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error');
    };

    setWs(socket); // Save the WebSocket connection to state for reuse

    return () => {
      socket.close(); // Cleanup the WebSocket connection on component unmount
    };
  }, []);

  const handleSubmit = () => {
    if (!terms || !c_level || !crn) {
      setError('Please provide all required fields.');
      return;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Sending data to server');
      // Send terms, c_level, and crn to the backend via WebSocket
      const requestData = { terms, crn, c_level };
      ws.send(JSON.stringify(requestData));
    } else {
      setError('WebSocket connection is not open');
    }
  };

  return (
    <div>
      <h1>Student Enrollment Info</h1>

      {/* Input Form */}
      <div>
        <input
          type="text"
          placeholder="Enter Term"
          value={terms}
          onChange={(e) => setTerms(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Enter Level (UG/PG)"
          value={c_level}
          onChange={(e) => setCLevel(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Enter CRN"
          value={crn}
          onChange={(e) => setCrn(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Display Data */}
      {studentCount && (
        <div>
          <h3>Enrollment Data</h3>
          <p>Term: {studentCount.terms}</p>
          <p>CRN: {studentCount.crn}</p>
          <p>Level: {studentCount.c_level}</p>
          <p>Max Seats: {studentCount.maxSeats}</p>
          <p>Total Registered: {studentCount.totalReg}</p>
          <p>Available Seats: {studentCount.availableSeats}</p>
        </div>
      )}

      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
