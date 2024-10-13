import React from 'react';
import { useParams } from 'react-router-dom';

function Overview() {
  const { username } = useParams();

  return (
    <div className="overview">
      <h1>Welcome, {username}!</h1>
    </div>
  );
}

export default Overview;
