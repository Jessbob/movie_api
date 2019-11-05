const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./Models/models.js");
const morgan = require("morgan");
const app = express();
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies", function(req, res) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/:Title", function(req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function(movie) {
      res.json(movie);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/genres/:Name", function(req, res) {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(function(movies) {
      res.json(movies.Genre);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/directors/:Name", function(req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function(movies) {
      res.json(movies.Director);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/users", function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/users/:Username", function(req, res) {
  Users.findOne({ Username: req.params.Username })
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/users", function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exist");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.staus(500).send("Error: " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.stauts(500).send("Error: " + error);
    });
});

app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.post("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { Favorites: req.params.MovieID }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete("/users/:Username/:Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { Favorites: req.params.MovieID }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send((req.params.Username = " was not found"));
      } else {
        res.status(200).send((req.params.Username = " was deleted."));
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(8080, () => console.log("Your app is listening on port 8080."));
