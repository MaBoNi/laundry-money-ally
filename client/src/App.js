import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Overview from './Overview';

function App() {
  const [showPincodePopup, setShowPincodePopup] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (username) => {
    setCurrentUsername(username);
    setShowPincodePopup(true);
    setPincode(''); // Reset pincode input
    setError('');   // Reset error message
  };

  const handlePincodeSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4321/validate_pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUsername, pincode })
      });
      const result = await response.json();

      if (response.ok) {
        // Navigate to the Overview page if pincode is correct
        navigate(`/overview/${currentUsername}`);
        setShowPincodePopup(false);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div className="button-container">
                <button className="blue-button" onClick={() => handleButtonClick('NOAH')}>NOAH</button>
                <button className="blue-button" onClick={() => handleButtonClick('NAJA')}>NAJA</button>
              </div>
              <div className="button-container">
                <button className="blue-button large-button" onClick={() => handleButtonClick('FAR')}>DAD</button>
              </div>

              {showPincodePopup && (
                <div className="pincode-popup">
                  <h2>Enter Pincode for {currentUsername}</h2>
                  <input
                    type="password"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                  />
                  <button onClick={handlePincodeSubmit}>Submit</button>
                  {error && <p className="error">{error}</p>}
                  <button onClick={() => setShowPincodePopup(false)}>Cancel</button>
                </div>
              )}
            </>
          } />
          <Route path="/overview/:username" element={<Overview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
