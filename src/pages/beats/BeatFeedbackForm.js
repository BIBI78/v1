// src/components/BeatFeedbackForm.js

import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
// new imports 
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Modal.module.css";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BeatFeedbackForm = ({ beatId }) => {
  const [feedback, setFeedback] = useState({
    fire: false,
    cold: false,
    hard: false,
    trash: false,
    loop: false,
    // Add other feedback fields as needed
  });

  const handleInputChange = (event) => {
    const { name, checked } = event.target;
    setFeedback({ ...feedback, [name]: checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/beats/${beatId}/feedback/`, feedback);
      console.log('Feedback submitted:', response.data);
      // Optionally, update UI or show a success message
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Provide Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fire:
          <input type="checkbox" name="fire" checked={feedback.fire} onChange={handleInputChange} />
        </label>
        <label>
          Cold:
          <input type="checkbox" name="cold" checked={feedback.cold} onChange={handleInputChange} />
        </label>
        <label>
          Hard:
          <input type="checkbox" name="hard" checked={feedback.hard} onChange={handleInputChange} />
        </label>
        <label>
          Trash:
          <input type="checkbox" name="trash" checked={feedback.trash} onChange={handleInputChange} />
        </label>
        <label>
          Loop:
          <input type="checkbox" name="loop" checked={feedback.loop} onChange={handleInputChange} />
        </label>
        {/* Add more fields as needed */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default BeatFeedbackForm;
