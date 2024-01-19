import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function Mp3CreateForm() {
  const [errors, setErrors] = useState({});
  const [mp3Data, setMp3Data] = useState({
    title: "",
    artist: "",
    mp3File: null,
  });
  const { title, artist, mp3File } = mp3Data;
  const mp3Input = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setMp3Data({
      ...mp3Data,
      [event.target.name]: event.target.value,
    });
  };

  const handleMp3FileChange = (event) => {
    if (event.target.files.length) {
      setMp3Data({
        ...mp3Data,
        mp3File: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("mp3File", mp3File);

    try {
      const { data } = await axiosReq.post("/mp3/create", formData);
      console.log('MP3 created successfully:', data);
      history.push(`/mp3/${data.id}`);
      // Redirect to the newly created MP3's page or another page as needed
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Artist</Form.Label>
        <Form.Control
          type="text"
          name="artist"
          value={artist}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.artist?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create MP3
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {mp3File ? (
                <div>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="mp3-upload"
                    >
                      Change the MP3 file
                    </Form.Label>
                  </div>
                </div>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="mp3-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an MP3 file"
                  />
                </Form.Label>
              )}

              <Form.File
                id="mp3-upload"
                accept=".mp3"
                onChange={handleMp3FileChange}
                ref={mp3Input}
              />
            </Form.Group>
            {errors?.mp3File?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default Mp3CreateForm;