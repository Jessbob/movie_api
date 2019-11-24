import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
    // axios
    //   .get("https://jessbob-flix.herokuapp.com/movies")
    //   .then(response => {
    //     this.setState({
    //       movies: response.data
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
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
    this.setState({
      user: null
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  register() {
    this.setState({ register: true });
  }

  goToLogin() {
    this.setState({ register: false });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* if (!user && register === false)
      return (
        <LoginView
          onClick={() => this.register()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      ); */

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
        </div>
      </Router>
    );
  }

  /*
<div className="main-view">
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                goBack={() => this.onMovieClick(null)}
              />
            ) : (
              movies.map(movie => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={movie => this.onMovieClick(movie)}
                />
              ))
            )}
          </Row>
          <Row>
            <Button id="onLoggedOut" onClick={() => this.onLoggedOut()}>
              Log Out
            </Button>
          </Row>
        </Container>
              </div> */
}
