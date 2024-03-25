// FireFeedbackButton.js

import React from "react";
import { Button } from "react-bootstrap";
 // eslint-disable-next-line 
import { axiosReq, axiosRes } from "../api/axiosDefaults";


const FireFeedbackButton = ({ beat }) => {
  console.log('BEAT: ', beat)
  const handleFireFeedback = async () => {
    try {
      console.log('BEAT TO TRY: ', beat)
      await axiosReq.post("/feedback/fire/", { beat });
      // await axiosReq.post(`/feedback/fire/${beatId}`);
      // await axiosReq.post("/feedback/fire/", { beat: id });
      // axiosRes.post("/likes/", { beat: id });
      // Handle successful feedback submission (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error submitting fire feedback:", error);
    }
  };

  return (
    <Button variant="primary" onClick={handleFireFeedback}>
      Fire
    </Button>
  );
};

export default FireFeedbackButton;

