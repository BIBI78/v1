import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Beat from "./Beat";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import BeatRatingForm from "./BeatRatingForm";

function BeatPage() {
  const { id } = useParams();
  const [beat, setBeat] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [averageRating, setAverageRating] = useState(0);
  const owner = beat.results[0]?.owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: beat }, { data: comments }] = await Promise.all([
          axiosReq.get(`/beats/${id}/`),
          axiosReq.get(`/comments/?beat=${id}`),
      
        ]);
        setBeat({ results: [beat] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  const updateAverageRating = (newRating) => {
    const totalRatings = averageRating * beat.results[0].ratings_count;
    const newAverageRating =
      (totalRatings + newRating.rating) / beat.results[0].ratings_count;
    setAverageRating(newAverageRating);
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* CHANGE HERE MOST POPULAR BEATS */}
        <p>popular producers</p>
        <Beat {...beat.results[0]} setBeats={setBeat} beatPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <>
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                beat={id}
                setBeat={setBeat}
                averageRating={averageRating.toFixed(2)}
                setComments={setComments}
              />
              <Container className={`mb-3 ${appStyles.Content}`}>
                {currentUser && currentUser.profile_id ? (
                  <BeatRatingForm
                    // double id ???
                    profile_id={currentUser.profile_id}
                    beat={id}
                    id={id}
                    owner={owner}
                    setBeat={setBeat}
                    currentUser={currentUser}
                    averageRating={averageRating.toFixed(2)}
                    updateAverageRating={updateAverageRating}
                  />
                ) : (
                  <div> login to rate the beat.</div>
                )}
              </Container>
            </>
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setBeat={setBeat}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments yet.</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default BeatPage;