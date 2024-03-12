import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // const handleSignOut = async () => {
  //   try {
  //     await axios.post("dj-rest-auth/logout/");
  //     setCurrentUser(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
   const handleSignOut = async () => {
    try {
      await axios.beat("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };



 const addBeatIcon = (
   <NavLink
  className={styles.NavLink}
  activeClassName={styles.Active}
  to="/mybeats/create" 
>
  <i className={`far fa-file-audio ${styles.navBarIcons}`}></i>Upload Beats
</NavLink>

 );
  
  const loggedInIcons = (
    <>
     
      <NavLink className={styles.navBarIcons}
        activeClassName={styles.Active} to="/feed">
  <i className={`fas fa-stream ${styles.navBarIcons}`}></i>Feed
</NavLink>

      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className={`fas fa-heart ${styles.navBarIcons}`}></i>
Liked
       </NavLink>
     
      <NavLink className={`${styles.NavLink} ${styles.navBarIcons}`} to="/" onClick={handleSignOut}>
  <i className={`fas fa-sign-out-alt ${styles.navBarIcons}`}></i>Sign out
</NavLink>

  

      <NavLink
        className={styles.navBarIcons}
        
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className={`fas fa-sign-in-alt ${styles.NavLink}  ${styles.navBarIcons}`}></i>Sign in

      </NavLink>
   
      <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
  <i className={`fas fa-user-plus ${styles.navBarIcons}`}></i>Sign up
</NavLink>

    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addBeatIcon} 
        {/* {currentUser && addPostIcon} */}
        {/* {mp3Icon} */}
        {/* {addBeatIcon} */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

