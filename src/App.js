import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import Mp3CreateForm from "./pages/mp3s/Mp3CreateForm";

import { useCurrentUser } from "./contexts/CurrentUserContext";

import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
// BEATS
import BeatCreateForm from "./pages/beats/BeatCreateForm";
import BeatPage from "./pages/beats/BeatPage";
import BeatsPage from "./pages/beats/BeatsPage";
import BeatEditForm from "./pages/beats/BeatEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              // Might need to put beats here
              <BeatsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              // beats ?
              <BeatsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              // beats ?
              <BeatsPage
                message="No results found. Adjust the search keyword or like for thst type of beat."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* might need to take out this mp3 route */}
          {/* <Route exact path="/mp3s/create" render={() => <Mp3CreateForm />} /> */}
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
         <Route exact path="/beats/:id" render={() => <BeatPage />} />
          <Route exact path="/beats/:id/edit" render={() => <BeatEditForm />} />
          <Route exact path="/mybeats/create" render={() => <BeatCreateForm/>} />
          
          
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
