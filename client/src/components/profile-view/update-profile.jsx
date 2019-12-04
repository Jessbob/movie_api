import React, { useState, useEffect } from "react";
//Routing
import axios from "axios";
import { connect } from "react-redux";
//Styling
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};

export function UpdateProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const user = props.user;

  const updateSubmit = e => {
    e.preventDefault();
    console.log();
    const userInfo = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    axios
      .put(`https://jessbob-flix.herokuapp.com/users/${user}`, userInfo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(reponse => {
        props.updateUser(userInfo);
        alert("Update Succsessfull");
        localStorage.getItem("token");
        localStorage.getItem("user");
        window.open("/", "_self");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteSubmit = e => {
    e.preventDefault();

    axios
      .delete(`https://jessbob-flix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        alert("Your account has been deleted.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch(e => {
        alert("Error deleting your account");
      });
  };

  return (
    <Container style={{ width: "42rem" }}>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We will never share your information with anyone
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicDob">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="12/31/1999"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" onClick={updateSubmit}>
          Update Profile
        </Button>{" "}
        <Button
          className="btn-delete"
          variant="danger"
          type="submit"
          onClick={deleteSubmit}
        >
          Delete profile
        </Button>
      </Form>
    </Container>
  );
}
export default connect(mapStateToProps)(UpdateProfileView);
