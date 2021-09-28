const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=becc71dd60c0bfc8cd5588bf4f1610a9&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  // request({ url: url, json: true }, (error, response) => {
  //   if (error) {
  //     callback("Unable to connect to weather service!", undefined);
  //   } else if (response.body.error) {
  //     console.log("Unable to find location.");
  //   } else {
  //     callback(
  //       undefined,
  //       `It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain. It feels like ${response.body.current.feelslike} degrees out.`
  //     );
  //   }
  // });

  //destructuring and property shorthand challenge
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      console.log(body.error);
      console.log("Unable to find location.");
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
