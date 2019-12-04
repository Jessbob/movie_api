import React from "react";
//routing data
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie } = this.props;
    if (!movie) return null;

    return (
      <Container style={{ width: "42rem" }}>
        <div className="movie-view">
          <div className="value">
            <h2>{movie.Title}</h2>

            <img className="movie-poster" src={movie.ImagePath} />
            <br />
          </div>
          <div className="movie-description">
            <span className="label">
              <h5>Description: </h5>
            </span>{" "}
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>

          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
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
