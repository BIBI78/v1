
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Rating.module.css';

const Rating = ({ postId, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleRate = async (newRating) => {
    try {
      // Send a request to the server to handle the rating for the specific post
      // here is the problem 
      const response = await axios.post(`/rating/`, { postId: postId, rating: newRating });

      // Assuming the server responds with the updated rating
      const updatedRating = response.data.rating;
      setRating(updatedRating);
      setHoveredRating(null); // Reset hovered rating when a rating is selected

      // Optionally, notify the parent component about the rating change
      if (onRatingChange) {
        onRatingChange(updatedRating);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.Rating}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`${styles.Star} ${value <= (hoveredRating || rating) ? styles.Selected : ''}`}
          onClick={() => handleRate(value)}
          onMouseEnter={() => setHoveredRating(value)}
          onMouseLeave={() => setHoveredRating(null)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
