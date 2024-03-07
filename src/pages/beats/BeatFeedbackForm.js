import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import appStyles from "../../styles/BeatFeedbackForm.module.css";

const BeatFeedbackForm = ({ beatId }) => {
  const [feedback, setFeedback] = useState({
    fire: false,
    cold: false,
    hard: false,
    trash: false,
    loop: false,
  });

  const [feedbackCounts, setFeedbackCounts] = useState({
    fire: 0,
    cold: 0,
    hard: 0,
    trash: 0,
    loop: 0,
  });

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fire', feedback.fire ? 'true' : 'false');
      formData.append('cold', feedback.cold ? 'true' : 'false');
      formData.append('hard', feedback.hard ? 'true' : 'false');
      formData.append('trash', feedback.trash ? 'true' : 'false');
      formData.append('loop', feedback.loop ? 'true' : 'false');
      formData.append('beat', beatId);
      console.log('beatId:', beatId);


      const { data } = await axios.post("/feedback/", formData);
      history.push(`/beats/${data.id}`);
      
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        // Handle errors
      }
    }
  };

  const handleIconClick = (fieldName) => {
    setFeedback({ ...feedback, [fieldName]: !feedback[fieldName] });
    setFeedbackCounts((prevCounts) => ({
      ...prevCounts,
      [fieldName]: feedback[fieldName] ? prevCounts[fieldName] - 1 : prevCounts[fieldName] + 1,
    }));
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
        
       <button type="submit" className={appStyles.submitButton}>  Submit Feedback</button>
      </form>
    </div>
  );
};

export default BeatFeedbackForm;