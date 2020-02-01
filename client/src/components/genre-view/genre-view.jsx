import React from "react";
//Routing
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Styling
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

/**
 * @function GenreView
 * @param {string} https://jessbob-flix.herokuapp.com/movies/:genre GET request JSON object holding data about a genre.
{
genre: “Genres name”,
description: “Genres Description”
}

 * @return {object<array>}
 * @example function GenreView(props) {
  const { movies, genreName } = props;
  const genre = movies.find(m => m.Genre.Name === genreName);
 */

function GenreView(props) {
  const { movies, genreName } = props;
  const genre = movies.find(m => m.Genre.Name === genreName);

  return (
    <Container>
      <Card bg="primary" text="white">
        <Card.Header>
          <h2>{genre.Genre.Name}</h2>
        </Card.Header>
        <Card bg="light" text="primary">
          <Card.Body>
            <Card.Text>
              Description: <br />
              <br />
              {genre.Genre.Description}
              <br />
            </Card.Text>
            <div className="text-center">
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Card>
    </Container>
  );
}

export default connect(({ movies }) => ({ movies }))(GenreView);
