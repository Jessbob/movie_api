import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { director } = this.props;
    if (!director) return null;
    return (
      <Card className="director-info" /*style={{ width: "32rem" }}*/>
        <Card.Body>
          <Card.Title className="director-name">{director.Name}</Card.Title>
          <Card.Text>
            Biography: <br />
            <br />
            {director.Description}
            <br />
            <br />
            Birth Year: {director.Birth}
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
