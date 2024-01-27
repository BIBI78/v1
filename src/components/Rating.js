// Rating.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Rating.module.css';

const Rating = ({ postId, mp3Id, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(null);

  useEffect(() => {
    // Fetch the existing rating when the component mounts
    const fetchRating = async () => {
      try {
        let response;
        if (postId) {
          response = await axios.get(`/rating/?post=${postId}`);
        } else if (mp3Id) {
          response = await axios.get(`/rating/?mp3=${mp3Id}`);
        }
        const fetchedRating = response.data[0].rating;  // Assuming you only get one rating
        setRating(fetchedRating);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRating();
  }, [postId, mp3Id]);

  const handleRate = async (newRating) => {
    try {
      let response;
      if (postId) {
        response = await axios.post(`/rating/`, { post: postId, rating: newRating });
      } else if (mp3Id) {
        response = await axios.post(`/rating/`, { mp3: mp3Id, rating: newRating });
      }
      
      const updatedRating = response.data.rating;
      setRating(updatedRating);
      setHoveredRating(null);

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
