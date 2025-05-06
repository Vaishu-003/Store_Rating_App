import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Fetch store data for the owner
    axios
      .get(`/api/store/${user.storeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setStore(response.data);
        setRatings(response.data.ratings);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, [user]);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <h3>Welcome, {user?.name}</h3>

      {store ? (
        <>
          <h4>Store Name: {store.name}</h4>
          <p>Store Address: {store.address}</p>
          <p>Average Rating: {store.averageRating}</p>

          <h4>Users Who Rated Your Store:</h4>
          {ratings.length === 0 ? (
            <p>No ratings submitted yet.</p>
          ) : (
            <ul>
              {ratings.map((rating) => (
                <li key={rating.userId}>
                  <p>{rating.userName}: {rating.rating}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading your store data...</p>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
