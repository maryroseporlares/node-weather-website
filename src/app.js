//app.com
//app.com/help
//app.com/about

// const express = require("express");
// const app = express();

// app.get("", (req, res) => {
//   res.send("Hello express.");
// });
// app.get("/help", (req, res) => {
//   res.send("Help page...");
// });
// app.get("/about", (req, res) => {
//   res.send("About page...");
// });
// app.get("/weather", (req, res) => {
//   res.send("Weather page...");
// });
// app.listen(3000, () => {
//   console.log("Server is up to port 3000.");
// });

//~~~Serving up HTML and JSON~~~

// const path = require("path");
// const express = require("express");

// const app = express();
// //set-up handlebars engine and views location
// app.set("view engine", "hbs");
// //set-up static directory to serve
// app.use(express.static(path.join(__dirname, "../public")));

// app.get("", (req, res) => {
//   res.render("index", {
//     title: "The Alchemist",
//     mainCharacter: "Santiago",
//   });
// });
// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "The Alchemist",
//     mainCharacter: "Santiago",
//   });
// });
// app.get("/help", (req, res) => {
//   res.render("help");
// });
// app.listen(3000, () => {
//   console.log("Server is up to port 3000.");
// });

//~~~Advanced Templating~~~
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const response = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Challenge
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const address = process.argv[2];

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set-up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set-up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    subTitle: "Know your weather forecast today",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Your weather forecast today",
    subTitle:
      "Get the latest news about your weather or in any location worldwide",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    subTitle: "Help page.",
  });
});

//Challenge
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address or location.",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, place_name } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longitude, (error, forecastData = {}) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: place_name,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    subTitle: "Error!",
    errorMsg: "Help result not found!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    subTitle: "Error!",
    errorMsg: "Page not found!",
  });
});

// app.listen(3000, () => {
//   console.log("Server is up to port 3000.");
// });
app.listen(port, () => {
  console.log("Server is up to port " + port);
});
