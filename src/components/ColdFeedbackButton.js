import React from "react";
import { Button } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

const ColdFeedbackButton = ({ beat, cold_id, cold_count, setBeats }) => {
  const handleColdFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/cold/", { beat });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === beat.id
            ? { ...beatItem, cold_count: beatItem.cold_count + 1, cold_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting cold feedback:", err);
    }
  };

  const handleColdFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/cold/${cold_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === beat.id
            ? { ...beatItem, cold_count: beatItem.cold_count - 1, cold_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error CANNOT undoing cold feedback:", err);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleColdFeedbackLike}>
        Cold
      </Button>
      <Button variant="primary" onClick={handleColdFeedbackUnlike}>
        Undo Cold
      </Button>
      <span style={{ marginLeft: "5px" }}>Cold Count: {cold_count} HELLO </span>
    </div>
  );
};

export default ColdFeedbackButton;
