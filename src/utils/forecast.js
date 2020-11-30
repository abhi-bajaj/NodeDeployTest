const axios = require('axios')

const forecast = (pos, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a2b040ff56bdb0accede762b0a921eb1&query=${
    (pos.lat, pos.long)
  }3&units=m`

  axios
    .get(url)
    .then(response => {
      callback(
        response.data.current.weather_descriptions[0] +
          '. It is currently ' +
          response.data.current.temperature +
          ' degrees.',
        undefined
      )
    })
    .catch(error => {
      callback(undefined, error)
    })
}

module.exports = forecast
