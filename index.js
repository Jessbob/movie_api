const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));

let topMovies = [
  {
    title: "Tombstone",
    director: "George P. Cosmatos, Kevin Jarre"
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis"
  },
  {
    title: "Back to the Future",
    director: "Robert Zemeckis"
  },
  {
    title: "Scarface",
    director: "Oliver Stone"
  },
  {
    title: "The Big Lebowski",
    director: "Joel & Ethan Coen"
  },
  {
    title: "Fargo",
    director: "Joel & Ethan Coen"
  }
];

app.get("/", function(req, res) {
  res.send("Welcome to myFlix!");
});

app.get("/movies", function(req, res) {
  res.json(topMovies);
});

app.use(express.static("public"));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => console.log("Your app is listening on port 8080."));
