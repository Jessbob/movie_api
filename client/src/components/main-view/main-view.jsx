import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateProfileView } from "../profile-view/update-profile";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false,
      userInfo: {}
    };
  }

  getMovies(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("https://jessbob-flix.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
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
      user: authData.user.Username
    });

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
    window.open("/", "_self");
  }

  register() {
    this.setState({ register: true });
  }

  goToLogin() {
    this.setState({ register: false });
  }

  render() {
    const {
      movies,
      selectedMovie,
      user,
      register,
      userInfo,
      token
    } = this.state;

    if (register)
      return (
        <RegistrationView
          onClick={() => this.goToLogin()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div>
          <Link to={`/`}>
            <Button variant="link">Movies</Button>
          </Link>
          <Link to={`/users/${user}`}>
            <Button variant="link">Profile</Button>
          </Link>
          <Button variant="link" onClick={() => this.onLoggedOut()}>
            Log Out
          </Button>
        </div>
        <br />

        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />);
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} />

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />

          <Route
            path="/users/:Username"
            render={({ match }) => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <ProfileView userInfo={userInfo} movies={movies} />;
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
