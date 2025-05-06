import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoreDetail.css"; // Add your CSS for styling

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`/api/stores/${id}`);
        setStore(res.data);
      } catch (err) {
        console.error("Failed to fetch store:", err);
      }
    };
    fetchStore();
  }, [id]);

  const handleRatingSubmit = async () => {
    try {
      await axios.post(`/api/stores/${id}/rate`, {
        rating: Number(rating),
      });
      alert("Rating submitted!");
    } catch (err) {
      console.error("Failed to submit rating:", err);
    }
  };

  if (!store) return <p>Loading store details...</p>;

  return (
    <div className="store-detail-container">
      <div className="store-detail-header">
        <img
          src={store.imageUrl || "https://via.placeholder.com/600"}
          alt={store.name}
          className="store-detail-image"
        />
        <div className="store-detail-info">
          <h2>{store.name}</h2>
          <p>{store.description}</p>
          <p><strong>Address:</strong> {store.address}</p>
          <p><strong>Average Rating:</strong> {store.averageRating?.toFixed(1) || "N/A"}</p>
        </div>
      </div>

      <div className="rating-section">
        <h4>Rate this store:</h4>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="rating-input"
        />
        <button onClick={handleRatingSubmit} className="rating-submit-btn">
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default StoreDetail;
