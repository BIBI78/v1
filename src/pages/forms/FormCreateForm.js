import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/FormCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function FormCreateForm(props) {
  const { setForms, profileImage, profile_id } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/forms/", {
        title,
        content,
      });
      setForms((prevForms) => ({
        ...prevForms,
        results: [data, ...prevForms.results],
      }));
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Title}
            placeholder="Title"
            value={title}
            onChange={handleChangeTitle}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Control
          className={styles.Content}
          placeholder="Content"
          as="textarea"
          rows={3}
          value={content}
          onChange={handleChangeContent}
        />
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!title.trim() || !content.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default FormCreateForm;
