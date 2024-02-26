import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Rating } from "react-simple-star-rating";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Modal.module.css";


function BeatRatingForm(props) {
  const { beat, setBeat, id, owner } = props;
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [noRateModal, setNoRateModal] = useState(false);
  const [ownerRateModal, setOwnerRateModal] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: ratingsData } = await axiosReq.get(`/rating/`);
      const userRating = ratingsData.results.find((rating) => {
        return (
          rating.owner === currentUser?.username &&
          rating.beat === parseInt(id, 10)
        );
      });

      if (userRating) {
        setNoRateModal(true);
        setTimeout(() => setNoRateModal(false), 3000);
        return;
      }

      if (is_owner) {
        setOwnerRateModal(true);
        setTimeout(() => setOwnerRateModal(false), 3000);
        return;
      }

      await axiosRes.post("/rating/", {
        beat,
        rating,
      });

      setBeat((prevBeat) => ({
        ...prevBeat,
        results: prevBeat.results.map((beat) => {
          return beat.id === parseInt(id)
            ? {
                ...beat,
                rating: beat.rating,
                ratings_count: beat.ratings_count + 1,
              }
            : beat;
        }),
      }));

      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Get all elements with the class "style-module_simpleStarRating__nWUxf"
    const starRatingElements = document.querySelectorAll('.style-module_simpleStarRating__nWUxf');

    // Loop through each star rating element
    starRatingElements.forEach(element => {
      // Get the filled icons container element
      const filledIcons = element.querySelector('.style-module_fillIcons__6---A');
      // Set the color of the filled icons to green
      filledIcons.style.color = 'rgb(11 255 14)';
    });
  }, []);

  return (
    <>
      <div className="text-center">Rate This Beat Vamp </div>
      <Form className="mt-2 pb-4" onSubmit={handleRatingSubmit}>
        <div className="text-center p-1 mb-1">
          <Rating onClick={handleRating} />
        </div>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          type="submit"
        >
          Submit
        </button>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.Psuccess}>
            Thank you, your rating has been registered.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={noRateModal} onHide={() => setNoRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Sorry slime it seems you have already rated this beat, 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNoRateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={ownerRateModal} onHide={() => setOwnerRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Na it dont work like that , cant rate your own shit.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOwnerRateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BeatRatingForm;
