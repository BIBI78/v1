import React from "react";
import styles from "../../styles/Beat.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

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
    image,
    updated_at,
    beatPage,
    setBeats,
    mp3,
    mp3_url

  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

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
      const { data } = await axiosRes.beat("/likes/", { beat: id });
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
        <Card.Img src={image} alt={title} />
        {mp3 && (
        <audio controls className={styles.Audio}>
          <source src={mp3_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      </Link>
      {/* MP3 */}

       {/* {mp3 && (
        <audio controls className={styles.Audio}>
          <source src={mp3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )} */}

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.beatBar}>
          {is_owner ? (
            <OverlayTrigger
                          placement="top"
                        //   gotta change this
              overlay={<Tooltip>You can't like your own beat!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like beatss!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/beats/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Beat;