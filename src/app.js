const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const homePage = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

// Setup the view engine, views location and the hbs partial
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(homePage));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Forecast",
    name: "Edom"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Edom",
    message: "This is my website"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Edom"
  });
});

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.get("/help", (req, res) => {
//   res.send("Help Page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page<h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You need to provide an address" });
  }
  //   res.send({
  //     forecast: "35 degree",
  //     loacation: "Shenzhen",
  //     address: req.query.address
  //   });
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      // if invalid input, destructuring has TypeError, using = {} to fix that
      if (error) {
        return res.send({ error });
      }
      // console.log("Data: ", data);
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location: location,
          forecast: forecastData
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Me",
    errorMsg: "Could not found help article!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Me",
    errorMsg: "Page not found!"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
