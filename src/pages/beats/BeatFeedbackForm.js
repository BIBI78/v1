// src/components/BeatFeedbackForm.js

import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const BeatFeedbackForm = ({ beatId }) => {
  const [feedback, setFeedback] = useState({
    fire: false,
    cold: false,
    // Add other feedback fields as needed
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
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
        {/* Add more fields as needed */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default BeatFeedbackForm;
