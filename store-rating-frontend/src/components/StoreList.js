import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StoreList.css"; // Add your CSS for styling

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/stores")
      .then((response) => setStores(response.data))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  return (
    <div className="store-list-container">
      <h2 className="store-list-title">Store List</h2>
      <div className="store-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <img
              src={store.imageUrl || "https://via.placeholder.com/300"}
              alt={store.name}
              className="store-card-image"
            />
            <div className="store-card-body">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>Rating: {store.averageRating}</p>
              <Link to={`/stores/${store.id}`} className="view-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
