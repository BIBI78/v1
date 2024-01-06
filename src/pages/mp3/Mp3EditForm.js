import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/Mp3CreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function Mp3EditForm() {
  const [errors, setErrors] = useState({});

  const [mp3Data, setMp3Data] = useState({
    title: "",
    content: "",
    mp3: "",
  });
  const { title, content, mp3 } = mp3Data;

  const mp3Input = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/mp3s/${id}/`);
        const { title, content, mp3, is_owner } = data;

        is_owner ? setMp3Data({ title, content, mp3 }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setMp3Data({
      ...mp3Data,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeMp3 = (event) => {
    if (event.target.files.length) {
      setMp3Data({
        ...mp3Data,
        mp3: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (mp3Input?.current?.files[0]) {
      formData.append("mp3", mp3Input.current.files[0]);
    }

    try {
      await axiosReq.put(`/mp3s/${id}/`, formData);
      history.push(`/mp3s/${id}`);
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
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
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
        Save
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
              {mp3 ? (
                <audio controls>
                  <source src={mp3} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="mp3-upload"
                >
                  Choose an MP3 file
                </Form.Label>
              )}

              <Form.File
                id="mp3-upload"
                accept="audio/*"
                onChange={handleChangeMp3}
                ref={mp3Input}
              />
            </Form.Group>
            {errors?.mp3?.map((message, idx) => (
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

export default Mp3EditForm;

