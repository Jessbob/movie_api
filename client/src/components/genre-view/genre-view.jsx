import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { genre } = this.props;
    if (!genre) return null;
    return (
      <Card className="genre-info" /*style={{ width: "42rem" }}*/>
        <Card.Body>
          <Card.Title className="genre-name">{genre.Name}</Card.Title>
          <Card.Text>
            Description: <br />
            <br />
            {genre.Description}
            <br />
          </Card.Text>
          <div className="text-center">
            <Link to={`/`}>
              <Button variant="link">Back</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
