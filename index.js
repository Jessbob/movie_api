const path = require("path");

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./Models/models.js");
const morgan = require("morgan");
const app = express();
const Movies = Models.Movie;
const Users = Models.User;
const { check, validationResult } = require("express-validator");
const cors = require("cors");

//mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
mongoose.connect(
  "mongodb+srv://jessbobadmin:myflixpass@jessbobflix-5rn1h.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(cors());
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

var auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

/**
   * Return a list of ALL movies to the user
   * @function get
   * @param {string} /movies Endpoint to send GET request for a list of all movies in the database.
   * @returns {object<array>} A Json object holding the data about all movies
   * @example app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
   */

app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
   * Return a specific movie to the user by title
   * @function get
   * @param {string} /movies/:Title Endpoint to send GET request for a specific movie.
   * @returns {object<array>} A JSON object holding data about a single movie. Containing a title, description, genre, director and image URL
{
title: “Fargo”,
description: “Movie Description goes here”,
genre: “Genre goes here”,
director: “Director’s name”
imageUrl:
}

   * @example app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
   */

app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
   * Return a specific genre to the user by name
   * @function get
   * @param {string} /movies/genres/:Name Endpoint to send GET request for a specific genre.
   * @returns {object<array>} A JSON object holding data about a genre.
{
genre: “Genres name”,
description: “Genres Description”
}
   * @example app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Genre);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
   */

app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Genre);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
   * Return a specific director to the user by name
   * @function get
   * @param {string} /movies/directors/:Name Endpoint to send GET request for a specific director.
   * @returns {object<array>} A JSON object holding data about a director.
{
director: “Director’s Name”,
bio: “Bio goes here”,
birth: “Birth year goes here”,
death: “Death year goes here”
}

   * @example app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Director);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
   */

app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(function(movies) {
        res.json(movies.Director);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
   * Return all users data
   * @function get
   * @param {string} /users Endpoint to send GET request for users.
   * @returns {object<array>} A JSON object holding data about all users
   * @example app.get("/users", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
 */

app.get("/users", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
   * Return a specific users data
   * @function get
   * @param {string} /users/:Username Endpoint to send GET request for a specific user.
   * @returns {object<array>} A JSON object holding data about the user, including an ID:
{
Id: “unique ID”
username: “moviephoneguy”,
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}

   * @example app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
   */

app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
   * Register new user
   * @function post
   * @param {string} /users Endpoint to send POST request to register new user. 
   * A JSON object holding data about the user to add, structured like:
{
username: “moviephoneguy”, 
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}
   * @returns {object<array>} A JSON object holding data about the user added, including an ID:
{
Id: “unique ID”
username: “moviephoneguy”,
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}
   * @example app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(function(user) {
        if (user) {
          return res.status(400).send(req.body.Username + "already exist");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
  }
);
   */

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(function(user) {
        if (user) {
          return res.status(400).send(req.body.Username + "already exist");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
  }
);

/**
   * Update user profile
   * @function put
   * @param {string} /users/:Username Endpoint to send PUT request to update user profile. 
   * A JSON object holding data about the user to add, structured like:
{
username: “moviephoneguy”, 
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}
   * @returns {object<array>} A JSON object holding data about the user that was updated:
{
username: “moviephoneguy”, 
name: "Cosmo Kramer",
dob: “05/01/1943”
email: newman@usps.com,
password: “jerry5A”
}

   * @example app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
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
  }
);
   */

app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
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
  }
);

/**
   * Add movie to users favorites
   * @function post
   * @param {string} /users/:Username/:Movies/:MovieID Endpoint to send POST request to add movie to user's favorites. 
   * @returns {string} A text message indicating that the movie was added to favorites.
   * @example app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);
   */

app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);

/**
   * Remove movie from favorites
   * @function delete
   * @param {string} /users/:Username/:Movies/:MovieID Endpoint to send DELETE request to remove movie from user's favorites. 
   * @returns {string} A text message indicating that the movie was removed from favorites.
   * @example app.delete(
  "/users/:Username/:Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);
   */

app.delete(
  "/users/:Username/:Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);

/**
   * Allow user to delete account
   * @function delete
   * @param {string} /users/:Username Endpoint to send DELETE request to remove user's account. 
   * @returns {string} A text message indicating that the user's account was deleted.
   * @example app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);
   */

app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
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
  }
);

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});

//app.listen(8080, () => console.log("Your app is listening on port 8080."));
