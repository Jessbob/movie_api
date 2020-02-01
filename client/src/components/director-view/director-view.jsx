import React from "react";
//Routing
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//styling
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

/**
 * @function DirectorView
 * @param {string} https://jessbob-flix.herokuapp.com/directors/:name GET request JSON object holding data about a director.
{
director: “Director’s Name”,
bio: “Bio goes here”,
birth: “Birth year goes here”,
death: “Death year goes here”
}
 * @return {object<array>}
 * @example function DirectorView(props) {
  const { movies, directorName } = props;
  const director = movies.find(m => m.Director.Name === directorName);
 */
function DirectorView(props) {
  const { movies, directorName } = props;
  const director = movies.find(m => m.Director.Name === directorName);

  return (
    <Container>
      <Card bg="primary" text="white">
        <Card.Header>
          <h2>{director.Director.Name}</h2>
        </Card.Header>
        <Card bg="light" text="primary">
          <Card.Body>
            <Card.Text>
              <h6>Biography:</h6>
              {director.Director.Description}
              <br />
              <br />
              Birth Year: {director.Director.Birth}
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

export default connect(({ movies }) => ({ movies }))(DirectorView);
