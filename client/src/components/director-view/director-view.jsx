import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

/*export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { director } = this.props;
    if (!director) return null;
    return ( */

function DirectorView(props) {
  const { movies, directorName } = props;
  const director = movies.find(m => m.Director.Name === directorName);

  return (
    <Container style={{ width: "52rem" }}>
      <Card className="director-info">
        <Card.Body>
          <Card.Title className="director-name">
            {director.Director.Name}
          </Card.Title>
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
    </Container>
  );
}

export default connect(({ movies }) => ({ movies }))(DirectorView);
