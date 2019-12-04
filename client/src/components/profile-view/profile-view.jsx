import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userInfo: null,
      favorites: [],
      movies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://jessbob-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userInfo: response.data,
          username: response.data.Username,
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

  deleteFavorite(event, favorite) {
    event.preventDefault();
    console.log(favorite);
    axios
      .delete(
        `https://jessbob-flix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Favorites/${favorite}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.getUser(localStorage.getItem("token"));
      })
      .catch(event => {
        alert("Somethings not right");
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, email, birthday, favorites } = this.state;
    const { movies } = this.props;
    return (
      <div className="profile-view">
        <Container>
          <Card bg="primary" text="white" style={{ width: "30rem" }}>
            <Card.Header>
              <h2>
                {"  "}
                {username}
              </h2>
            </Card.Header>
            <Card bg="light" text="primary">
              <Card.Body>
                <Card.Text>
                  <b>Email: {email}</b>
                </Card.Text>
                <Card.Text>
                  <b>Birthday: {birthday}</b>
                </Card.Text>
                <Card.Text>
                  <Link to={`/update/:Username`}>
                    <Button className="button-update" variant="link">
                      Update profile
                    </Button>
                  </Link>
                </Card.Text>
              </Card.Body>{" "}
            </Card>
          </Card>
        </Container>
        <br />
        <Container>
          <div className="favorite-movies">
            <span className="label">Favorite Movies: </span>

            <span className="Value">
              {favorites.map(favorite => {
                const movie = movies.find(movie => movie._id === favorite);

                if (movie) {
                  return (
                    <div className="favorites" key={favorite}>
                      <Link to={`/movies/${movie._id}`}>
                        <img
                          className="movie-poster"
                          style={{ width: "6rem" }}
                          src={movie.ImagePath}
                        />
                      </Link>
                      <div>
                        <Button
                          size="sm"
                          onClick={event =>
                            this.deleteFavorite(event, favorite)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                      <br />
                    </div>
                  );
                }
              })}
            </span>
          </div>
        </Container>

        <Container>
          <div>
            <Link to={`/`}>
              <Button variant="link">Back</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProfileView);
