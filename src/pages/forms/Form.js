import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import FormEditForm from "./FormEditForm"; // Assuming you have a FormEditForm component for editing forms

import styles from "../../styles/Form.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Form = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    title,
    content,
    id,
    setForms,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/forms/${id}/`);
      setForms((prevForms) => ({
        ...prevForms,
        results: prevForms.results.filter((form) => form.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <FormEditForm // This is your edit form component
              id={id}
              title={title}
              content={content}
              profileId={profile_id}
              profileImage={profile_image}
              setForms={setForms}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <h5>{title}</h5>
              <p>{content}</p>
            </>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Form;
