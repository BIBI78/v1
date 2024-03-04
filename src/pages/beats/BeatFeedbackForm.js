import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../styles/BeatFeedbackForm.module.css";

const BeatFeedbackForm = ({ beatId }) => {
  const [feedback, setFeedback] = useState({
    fire: false,
    cold: false,
    hard: false,
    trash: false,
    loop: false,
    // Add other feedback fields as needed
  });

  const [feedbackCounts, setFeedbackCounts] = useState({
    fire: 0,
    cold: 0,
    hard: 0,
    trash: 0,
    loop: 0,
    // Add other feedback fields as needed
  });

  const handleIconClick = (fieldName) => {
    setFeedback({ ...feedback, [fieldName]: !feedback[fieldName] });

    if (!feedback[fieldName]) {
      setFeedbackCounts((prevCounts) => ({
        ...prevCounts,
        [fieldName]: prevCounts[fieldName] + 1,
      }));
    } else {
      setFeedbackCounts((prevCounts) => ({
        ...prevCounts,
        [fieldName]: prevCounts[fieldName] - 1,
      }));
    }
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
        <span onClick={() => handleIconClick('fire')}>
          <i className={`fas fa-fire ${feedback.fire ? 'active' : ''}`}></i>
          <span>{feedbackCounts.fire}</span>
        </span>
        <span onClick={() => handleIconClick('cold')}>
          <i className={`fas fa-snowflake ${feedback.cold ? 'active' : ''}`}></i>
          <span>{feedbackCounts.cold}</span>
        </span>
        <span onClick={() => handleIconClick('hard')}>
          <i className={`fas fa-bolt ${feedback.hard ? 'active' : ''}`}></i>
          <span>{feedbackCounts.hard}</span>
        </span>
        <span onClick={() => handleIconClick('trash')}>
          <i className={`fas fa-trash-alt ${feedback.trash ? 'active' : ''}`}></i>
          <span>{feedbackCounts.trash}</span>
        </span>
        <span onClick={() => handleIconClick('loop')}>
          <i className={`fas fa-redo-alt ${feedback.loop ? 'active' : ''}`}></i>
          <span>{feedbackCounts.loop}</span>
        </span>
        {/* Add more icons as needed */}
       <button type="submit" className={appStyles.submitButton}>  Submit Feedback</button>
      </form>
    </div>
  );
};

export default BeatFeedbackForm;

