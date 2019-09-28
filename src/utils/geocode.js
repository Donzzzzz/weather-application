const request = require("request");

// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoienBvcHN0YXIiLCJhIjoiY2swN3ZreWloMDdqMjNjcXozbDdva2QzdyJ9.XVXUgtG6mwtj4C6GdHzt9A&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the location services!");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find the location");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoienBvcHN0YXIiLCJhIjoiY2swN3ZreWloMDdqMjNjcXozbDdva2QzdyJ9.XVXUgtG6mwtj4C6GdHzt9A&limit=1";
  //   console.log(url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location. Try another search!");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
