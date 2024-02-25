import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/FormCreateEditForm.module.css";

function FormEditForm(props) {
  const { id, title: initialTitle, content: initialContent, setShowEditForm, setForms } = props;

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/forms/${id}/`, {
        title: title.trim(),
        content: content.trim(),
      });
      setForms((prevForms) => ({
        ...prevForms,
        results: prevForms.results.map((form) => {
          return form.id === id
            ? {
                ...form,
                title: title.trim(),
                content: content.trim(),
              }
            : form;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className={styles.Title}
          type="text"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          className={styles.Content}
          as="textarea"
          rows={3}
          value={content}
          onChange={handleChangeContent}
          placeholder="Content"
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.Button}
          disabled={!title.trim() || !content.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default FormEditForm;
