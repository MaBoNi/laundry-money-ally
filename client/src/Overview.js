import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Overview.css';

console.log("Overview.js loaded");

function Overview() {
  const { username } = useParams();
  const [children, setChildren] = useState([]);
  const [isParent, setIsParent] = useState(false);
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildPincode, setNewChildPincode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("Fetching list of children for Overview...");
    fetch('http://localhost:4321/users/children')
      .then(response => response.json())
      .then(data => {
        console.log("Children data fetched:", data);
        setChildren(data);
      })
      .catch(error => console.error("Error fetching children:", error));

    // Check if the current user is a parent
    if (username === "FAR") {  // Assuming "FAR" is the parent role
      console.log("Current user is a parent.");
      setIsParent(true);
    } else {
      console.log("Current user is a child.");
    }
  }, [username]);

  const handleAddChild = async () => {
    console.log("Attempting to add a new child:", newChildName);
    try {
      const response = await fetch('http://localhost:4321/users/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newChildName, pincode: newChildPincode })
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Child added successfully:", newChildName);
        setChildren([...children, { id: result.id, username: newChildName }]);
        setMessage('Child added successfully');
        setNewChildName('');
        setNewChildPincode('');
        setShowAddChildForm(false);
      } else {
        console.error("Failed to add child:", result.message);
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error while adding child:", error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="overview">
      <h1>Welcome, {username}!</h1>
      <div className="child-list">
        {children.map(child => (
          <div key={child.id} className="child-box">
            <h3>{child.username}</h3>
          </div>
        ))}
      </div>

      {isParent && (
        <div className="add-child-section">
          <button onClick={() => setShowAddChildForm(!showAddChildForm)}>
            {showAddChildForm ? "Cancel" : "Add Child"}
          </button>
          
          {showAddChildForm && (
            <div className="add-child-form">
              <input
                type="text"
                placeholder="Child's Name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Child's Pincode"
                value={newChildPincode}
                onChange={(e) => setNewChildPincode(e.target.value)}
              />
              <button onClick={handleAddChild}>Submit</button>
            </div>
          )}
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Overview;
