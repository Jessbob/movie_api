import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class ProfileView extends React.Componet {
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get("https://jessbob-flix.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userData: response.data,
          userName: response.data.Username,
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

    return (
      <Card className="profile-view" style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title className="user-name">Username: {username}</Card.Title>
          <Card.Text>
            Password: ********
            <br />
            Email: {email}
            <br />
            Birthday: {birthday}
            <br />
          </Card.Text>
          <div className="text-center">
            <Link to={`/`}>
              <Button className="button-card" variant="info">
                Back
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
