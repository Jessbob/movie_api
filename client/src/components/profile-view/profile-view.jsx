import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import axios from "axios";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userInfo: null,
      favorites: [],
      movies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://jessbob-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userInfo: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { username, email, birthday, favorites } = this.state;
    const { movies } = this.props;
    return (
      <Container>
        <div className="profile-view">
          <div className="profile-title">
            <span className="label">Username: </span>
            <span className="value">{username}</span>
          </div>
          <div className="profile-email">
            <span className="label">Email: </span>
            <span className="value">{email}</span>
          </div>

          <div className="profile-birthday">
            <span className="label">Birthday: </span>
            <span className="value">{birthday}</span>
          </div>

          <div className="favorite-movies">
            <span className="label">Favorite Movies: </span>
            <span className="Value">
              {" "}
              <ul>
                {favorites.map(favorite => {
                  const movie = movies.find(movie => movie._id === favorite);

                  if (movie) {
                    return (
                      <div
                        className="favorites"
                        key={favorite}
                        style={{ width: "2 rem" }}
                      >
                        <img className="movie-poster" src={movie.ImagePath} />
                        <div className="movie-title">
                          <span className="label">Title: </span>
                          <span className="value">{movie.Title}</span>
                        </div>
                      </div>
                    );
                  }
                })}
              </ul>
            </span>
          </div>
          <div>
            <Link to={`/`}>
              <Button variant="link">Back</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}
