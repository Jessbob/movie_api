import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MovieView } from "../movie-view/movie-view";

/*export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { genre } = this.props;
    if (!genre) return null;
    return ( */

function GenreView(props) {
  const { movies, genreName } = props;
  const genre = movies.find(m => m.Genre.Name === genreName);

  return (
    <Container style={{ width: "52rem" }}>
      <Card className="genre-info" /*style={{ width: "42rem" }}*/>
        <Card.Body>
          <Card.Title className="genre-name">{genre.Genre.Name}</Card.Title>
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
    </Container>
  );
}

export default connect(({ movies }) => ({ movies }))(GenreView);
