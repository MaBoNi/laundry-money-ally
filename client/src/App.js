import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Overview from './Overview';

console.log("App.js loaded");

function MainComponent() {
  const [showPincodePopup, setShowPincodePopup] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching children...");
    fetch('http://localhost:4321/users/children')
      .then(response => response.json())
      .then(data => {
        console.log("Children fetched:", data);
        setChildren(data);
      })
      .catch(error => console.error("Error fetching children:", error));

    console.log("Fetching parents...");
    fetch('http://localhost:4321/users/parents')
      .then(response => response.json())
      .then(data => {
        console.log("Parents fetched:", data);
        setParents(data);
      })
      .catch(error => console.error("Error fetching parents:", error));
  }, []);

  const handleButtonClick = (username) => {
    console.log("Button clicked:", username);
    setCurrentUsername(username);
    setShowPincodePopup(true);
    setPincode(''); // Reset pincode input
    setError('');   // Reset error message
  };

  const handlePincodeSubmit = async () => {
    console.log("Submitting pincode for:", currentUsername);
    try {
      const response = await fetch('http://localhost:4321/validate_pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUsername, pincode })
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Pincode valid. Navigating to Overview page...");
        navigate(`/overview/${currentUsername}`);
        setShowPincodePopup(false);
      } else {
        console.error("Invalid pincode:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error during pincode validation:", error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="button-container">
        {children.map(child => (
          <button key={child.id} className="blue-button" onClick={() => handleButtonClick(child.username)}>
            {child.username}
          </button>
        ))}
      </div>
      <div className="button-container-large">
        {parents.map(parent => (
          <button key={parent.id} className="blue-button large-button" onClick={() => handleButtonClick(parent.username)}>
            {parent.username}
          </button>
        ))}
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
    </div>
  );
}

function App() {
  console.log("App component rendering");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/overview/:username" element={<Overview />} />
      </Routes>
    </Router>
  );
}

export default App;
