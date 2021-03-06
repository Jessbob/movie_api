import React from "react";
//Routing
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Actions
import { setMovies, setUser } from "../../actions/actions";
//Views
import MoviesList from "../movies-list/movies-list";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import { UpdateProfileView } from "../profile-view/update-profile";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
//Styling
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      register: false,
      userInfo: null
    };
  }
  /**
   * Return a list of ALL movies to the user
   * @function getMovies
   * @param {string}  https://jessbob-flix.herokuapp.com/movies URL to send GET request for a list of all movies in the database.
   * @returns {object<array>} A Json object holding the data about all movies
   * @example getMovies(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
   */
  getMovies(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  /**
   * Set user data
   * @function getUser
   * @param {string} https://jessbob-flix.herokuapp.com/users URL to send GET request for current user.
   * @return {object<array>} Set current user
   * @example getUser(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
   */

  getUser(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Allow users to update their user info (username, password, email, date of birth)
   * @function updateUser 
   * @param {string} https://jessbob-flix.herokuapp.com/users Sends PUT request JSON object holding data about the user to update, structured like:
{
username: “moviephoneguy”, 
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}

   * @return {object<array>} Update user data
   * @example  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.Username);
  }
   */

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.Username);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      userInfo: authData.user
    });
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    window.open("/client", "_self");
  }

  register() {
    this.setState({ register: true });
  }

  goToLogin() {
    this.setState({ register: false });
  }

  render() {
    let { movies } = this.props;
    let { user, userInfo, token } = this.state;

    return (
      <Router basename="/client">
        <Navbar bg="primary" variant="dark">
          <Link to={`/`}>
            <Button size="lg">
              <b>Movies</b>
            </Button>
          </Link>
          <Link to={`/users/${user}`}>
            <Button size="lg">
              <b>Profile</b>
            </Button>
          </Link>
          <Button size="lg" onClick={() => this.onLoggedOut()}>
            <b>Log Out</b>
          </Button>
        </Navbar>

        <br />

        <div className="main-view">
          <Container>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return <MoviesList movies={movies} />;
              }}
            />
          </Container>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} />
          <Route
            path="/movies/:id"
            render={({ match }) => <MovieView movieId={match.params.id} />}
          />

          <Route
            exact
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView directorName={match.params.name} />
            )}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => <GenreView genreName={match.params.name} />}
          />
          <Route
            path="/users/:Username"
            render={({ match }) => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <ProfileView />;
            }}
          />
          <Route
            path="/update/:Username"
            render={() => (
              <UpdateProfileView
                userInfo={userInfo}
                user={user}
                token={token}
                updateUser={data => this.updateUser(data)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
