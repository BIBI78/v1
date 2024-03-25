// ColdFeedbackButton.js

import React from "react";
import { Button } from "react-bootstrap";
 // eslint-disable-next-line 
import { axiosReq, axiosRes } from "../api/axiosDefaults";


const ColdFeedbackButton = ({ beat }) => {
  console.log('BEAT: ', beat)
  const handleColdFeedback = async () => {
    try {
      console.log('BEAT TO TRY: ', beat)
      await axiosReq.post("/feedback/cold/", { beat });
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error submitting cold feedback:", error);
    }
  };

  return (
    <Button variant="primary" onClick={handleColdFeedback}>
      cold
    </Button>
  );
};

export default ColdFeedbackButton;

