import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  render() {
    return (
      <Container>
        <div className="profile-view">
          <div className="profile-title">
            <span className="label">Username: </span>
            <span className="value">{user.Username}</span>
          </div>
          <div className="profile-email">
            <span className="label">Email: </span>
            <span className="value">{user.Email}</span>
          </div>

          <div className="profile-birthday">
            <span className="label">Birthday: </span>
            <span className="value">{user.Birthday}</span>
          </div>

          <div>
            <Link to={`/`}>
              <Button id="back">Back</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}
