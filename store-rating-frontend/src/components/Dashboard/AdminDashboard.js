import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get("/api/stores")
      .then((response) => setStores(response.data))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>Rating: {store.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
