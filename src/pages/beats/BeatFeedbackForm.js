import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BeatFeedbackForm = ({ beatId }) => {
  const [feedback, setFeedback] = useState({
    fire: false,
    cold: false,
    hard: false,
    trash: false,
    loop: false,
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
    // Include the owner field
    formData.append('owner', beatId); // should this be beatId or userId or ??

    const response = await axios.post("/feedback/fire/", formData);
    console.log('Feedback submitted successfully:', response.data);
    // Redirect to a specific page after successful submission
    history.push(`/beats/${beatId}`);
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('fire', feedback.fire ? 'true' : 'false');
  //     formData.append('cold', feedback.cold ? 'true' : 'false');
  //     formData.append('hard', feedback.hard ? 'true' : 'false');
  //     formData.append('trash', feedback.trash ? 'true' : 'false');
  //     formData.append('loop', feedback.loop ? 'true' : 'false');
  //     formData.append('beat', beatId);

  //     const response = await axios.post("/feedback/fire/", formData);
  //     console.log('Feedback submitted successfully:', response.data);
  //     // Redirect to a specific page after successful submission
  //     history.push(`/beats/${beatId}`);
  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //   }
  // };

  const handleIconClick = (fieldName) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [fieldName]: !prevFeedback[fieldName],
    }));
  };

  return (
    <div className="feedback-form">
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => handleIconClick('fire')}>
          Fire
        </button>
        <button type="button" onClick={() => handleIconClick('cold')}>
          Cold
        </button>
        <button type="button" onClick={() => handleIconClick('hard')}>
          Hard
        </button>
        <button type="button" onClick={() => handleIconClick('trash')}>
          Trash
        </button>
        <button type="button" onClick={() => handleIconClick('loop')}>
          Loop
        </button>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default BeatFeedbackForm;
