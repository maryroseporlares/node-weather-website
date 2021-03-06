const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFyeXJvc2Vwb3JsYXJlcyIsImEiOiJja3R6ajR1ZmwwaTJtMnVwZ21neWh6dm14In0.hp0OvPQdEmBli3wsXHHG8A&limit=1";

  // request({ url: url, json: true }, (error, response) => {
  //   if (error) {
  //     callback("Unable to connect to location services!", undefined);
  //   } else if (response.body.features.length === 0) {
  //     callback("Unable to find location. Try again.", undefined);
  //   } else {
  //     callback(undefined, {
  //       place_name: response.body.features[0].place_name,
  //       latitude: response.body.features[0].center[1],
  //       longitude: response.body.features[0].center[0],
  //     });
  //   }
  // });

  //destructuring and property shorthand challenge
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try again.", undefined);
    } else {
      callback(undefined, {
        place_name: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
