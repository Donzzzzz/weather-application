const request = require("request");

// const url =
//   "https://api.darksky.net/forecast/64a3612e5f36b5608e208da0a6958772/37.8267,-122.4233?units=si";

// request({ url: url, json: true }, (error, response) => {
//   //   The first error using for no network, if someone give the invalid input, the response contains the error message
//   //   const data = JSON.parse(response.body);
//   //   console.dir(data.currently, { depth: null });
//   //   console.log(response.body.currently);
//   if (error) {
//     console.log("Unable to connect to the location services!");
//   } else if (response.body.error) {
//     console.log("Unable to find the location");
//   } else {
//     console.log(
//       response.body.daily.data[0].summary +
//         " It is currently " +
//         response.body.currently.temperature +
//         " degrees out. There is a " +
//         response.body.currently.precipProbability +
//         "% chance of rain."
//     );
//   }
// });

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/64a3612e5f36b5608e208da0a6958772/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?units=si";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services!");
    } else if (response.body.error) {
      callback("Unable to find the location. Try another search!");
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degrees out. There is a " +
          response.body.currently.precipProbability +
          "% chance of rain. The highest temperature today is " +
          response.body.daily.data[0].temperatureHigh +
          " with a low of " +
          response.body.daily.data[0].temperatureLow +
          "."
      );
    }
  });
};

module.exports = forecast;
