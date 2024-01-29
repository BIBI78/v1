import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//BOOTSTRAP 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// STYLE CSS
import appStyles from "../../App.module.css";

// COMPONENTS 
// import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
// import PostRatingForm from "./PostRatingForm";
import Comment from "../comments/Comment";
//RATING BS
import PostRatingForm from "./PostRatingForm";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// AXIOS BS
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";


function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  //Rating set state 
  const [averageRating, setAverageRating] = useState(0);
  // ?? OWNER ??
  const owner = post.results[0]?.owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
    
  }, [id]);
// Rating calculation 
    const updateAverageRating = (newRating) => {
    // calculate the new average rating
    const totalRatings = averageRating * post.results[0].ratings_count;
    const newAverageRating =
      (totalRatings + newRating.rating) / post.results[0].ratings_count;

    setAverageRating(newAverageRating);
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]}
          id={id}
          setPosts={setPost}
          averageRating={averageRating.toFixed(2)}
          postPage
        />
        {/* HERE I PUT THE RATING FORM */}
              <Container className={`mb-3 ${appStyles.Content}`}>
          {/* Ternary to check if current user can comment */}
          {currentUser && currentUser.profile_id ? (
            <PostRatingForm
              // Passing props
              profile_id={currentUser.profile_id}
              event={id}
              id={id}
              owner={owner}
              setPost={setPost}
              currentUser={currentUser}
              averageRating={averageRating.toFixed(2)}
              updateAverageRating={updateAverageRating}
            />
          ) : (
            <div>Create an account or login to rate the event...</div>
          )}
          </Container>
        {/*  */}

        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
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
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;