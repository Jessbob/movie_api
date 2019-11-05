const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

let movies = [
  {
    title: "Tombstone",
    description: "Description goes here.",
    genre: "Western",
    director: "George P. Cosmatos, Kevin Jarre",
    imageUrl: "image url goes here",
    featured: "yes/no"
  },
  {
    title: "Forrest Gump",
    description: "Description goes here.",
    genre: "Romantic Comedy Drama",
    director: "Robert Zemeckis",
    imageUrl: "image url goes here",
    featured: "yes/no"
  },
  {
    title: "Back to the Future",
    description: "Description goes here.",
    genre: "Science Fiction Comedy",
    director: "Robert Zemeckis",
    imageUrl: "image url goes here",
    featured: "yes/no"
  },
  {
    title: "Scarface",
    description: "Description goes here.",
    genre: "Crime Drama",
    director: "Oliver Stone",
    imageUrl: "image url goes here",
    featured: "yes/no"
  },
  {
    title: "The Big Lebowski",
    description: "Description goes here.",
    genre: "Comedy",
    director: "Joel & Ethan Comedy",
    imageUrl: "image url goes here",
    featured: "yes/no"
  },
  {
    title: "Fargo",
    description: "Description goes here.",
    genre: "Dark Comedy Crime",
    director: "Joel & Ethan Cohen",
    imageUrl: "image url goes here",
    featured: "yes/no"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/genres/:genre", (req, res) => {
  res.send("Successful GET request returning genre data");
});

app.get("/director/:name", (req, res) => {
  res.send("Successful request returning director data");
});

app.post("/users", (req, res) => {
  let newUser = req.body;
  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message);
  } else {
    res.send("Success! New user was added");
  }
});

//app.put("/users/:username/:password/:email/:dob", (req, res) => {
app.put("/users/:username", (req, res) => {
  res.send("User information has been updated");
});

app.post("/users/:username/:favorites/:title", (req, res) => {
  res.send("Movie added to favorites");
});

app.delete("/users/:username/:favorites/:title", (req, res) => {
  res.send("Movie removed from favorites");
});

app.delete("/users/:username", (req, res) => {
  res.send("User successfully removed");
});

app.listen(8080, () => console.log("Your app is listening on port 8080."));
