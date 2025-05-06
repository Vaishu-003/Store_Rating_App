import React from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const ratedStores = []; // Fetch rated stores data here

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, User!</h2>
        <p>Your Rated Stores:</p>
      </div>
      <div className="store-cards">
        {ratedStores.length === 0 ? (
          <p>No stores rated yet.</p>
        ) : (
          ratedStores.map((store, index) => (
            <div className="store-card" key={index}>
              <h3>{store.name}</h3>
              <p>{store.description}</p>
              <Link to={`/stores/${store.id}`} className="btn">View Store</Link>
            </div>
          ))
        )}
      </div>
      <Link to="/stores" className="btn explore-btn">Browse Stores</Link>
    </div>
  );
};

export default UserDashboard;
