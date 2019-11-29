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
      favorites: []
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
    const { username, email, birthday, favorite } = this.state;

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
                {this.state.favorites.map(favorite => (
                  <li key={favorite}>{favorite}</li>
                ))}
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
