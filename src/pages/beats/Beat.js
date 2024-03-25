// src/components/Beat.js

import React, { useEffect, useState } from "react";
import styles from "../../styles/Beat.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import musicImage from "../../assets/music.jpg";
import star from "../../styles/Star.module.css";
import { Rating } from "react-simple-star-rating";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

//  trying something new 
import FireFeedbackButton from "../../components/FireFeedbackButton";


const Beat = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    updated_at,
    beatPage,
    setBeats,
    mp3,
    mp3_url,
    // fire_id,
    // fire_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [averageRating, setAverageRating] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleEdit = () => {
    history.push(`/beats/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/beats/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beat) => {
          return beat.id === id
            ? { ...beat, likes_count: beat.likes_count + 1, like_id: data.id }
            : beat;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beat) => {
          return beat.id === id
            ? { ...beat, likes_count: beat.likes_count - 1, like_id: null }
            : beat;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: ratingsData }] = await Promise.all([
          axiosReq.get(`/rating/`),
        ]);

        const ratingsForBeat = ratingsData.results.filter(
          (rating) => rating.beat === parseInt(id)
        );
        const totalRatings = ratingsForBeat.reduce(
          (acc, rating) => acc + rating.rating,
          0
        );
        const averageRating = ratingsForBeat.length
          ? totalRatings / ratingsForBeat.length
          : 0;

        setAverageRating(averageRating);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, [id]);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <Card className={styles.Beat}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && beatPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/beats/${id}`}>
        <Card.Img src={musicImage} alt={title} />
        {mp3 && (
          <audio controls className={styles.Audio}>
            <source src={mp3_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.beatBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own beat!</Tooltip>}
            >
              
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`far fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like beats!</Tooltip>}
            >
              <i className="far fa-heart" />
                  </OverlayTrigger>
                  
          )}
          {/* likes count here  */}
          {likes_count}
          <Link to={`/beats/${id}`}>
            <i className={`far fa-comments ${styles.Comment}`}  />
          </Link>
          {comments_count}
          </div>
        
        <span className="float-right star.Star">
          {hasLoaded ? (
            <>
              <Rating
                className={star.Star}
                readonly
                initialValue={averageRating.toFixed(1)}
                size={25}
                // style={{ color: "#00ff00" }}
                // COME BACK HERE
                // fillColor="#00ff00"
              />
              {averageRating.toFixed(1)}
            </>
          ) : (
            "Loading rating..."
          )}
        </span>
        <div>
      {/* Other beat content */}
      <FireFeedbackButton beat={id} />
      {/* Render other feedback buttons here */}
    </div>
  {/* Render BeatFeedbackForm component */}
        {/* <span className="float-left" >
        
          <BeatFeedbackForm beatId={id} />
        </span>
         */}
      </Card.Body>
    </Card>
  );
};

export default Beat;