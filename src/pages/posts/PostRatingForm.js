/* eslint-disable */
// React hooks
import React, { useEffect, useState } from "react";


// Bootstrap
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";

// Styles and CSS

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Modal.module.css";




// rating library and Axios import
import { Rating } from "react-simple-star-rating";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";


// Gets the post info, id and comments and passing it down as props

function PostRatingForm(props) {
  const { post, setPost, id, owner } = props;
  // const { id } = useParams();
  // const [post, setPost] = useState({ results: [] });

  // const currentUser = useCurrentUser();
  // const profile_image = currentUser?.profile_image;
  // const [comments, setComments] = useState({ results: [] });
  // const [averageRating, setAverageRating] = useState(0);
  // const owner = post.results[0]?.owner;

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
    // Post new rating to database
    e.preventDefault();
      try {
      
      const { data: ratingsData } = await axiosReq.get(`/rating/`);
      // check if user has already rated and to compare post with id i
      // convert id to integer
      const userRating = ratingsData.results.find((rating) => {
        return (
          rating.owner === currentUser?.username &&
          rating.post === parseInt(id, 10)
        );
      });

          // if the current user has already rated the post
      if (userRating) {
        setNoRateModal(true);
        setTimeout(() => setNoRateModal(false), 3000);
        return;
      }

        // if user is owner of the post
      if (is_owner) {
        setOwnerRateModal(true);
        setTimeout(() => setOwnerRateModal(false), 3000);
        return;
      }

            // Post new rating to database
      await axiosRes.post("/rating/", {
        post,
        rating,
      });

          setPost((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === parseInt(id)
            ? {
                ...post,
                rating: post.rating,
                ratings_count: post.ratings_count + 1,
              }
            : post;
        }),
          }));
        
          // Pass the rating to parent
      setShowModal(true);
      // Show modal and close it after 2 seconds.
      setTimeout(() => setShowModal(false), 2000);
      setRating(0);
    } catch (err) {
      // console.log(err);
    }
  };
return (
    <>
      <div className="text-center">Rate This Post Vamp </div>
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
          <Button variant="secondary" onClick={() => setNoRateModal(false)}>
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
            Sorry slime it seems you have already rated this post, 
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

  
  


export default PostRatingForm;