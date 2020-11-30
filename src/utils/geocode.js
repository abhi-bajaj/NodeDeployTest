const axios = require('axios')

const geocode = (city, callback) => {
  const cityForAPI = city.replace(' ', '%20')
  const mapboxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityForAPI}.json?access_token=pk.eyJ1IjoiYWJoaWJhamFqIiwiYSI6ImNraHQxc21oNzBpejMyeG10OHNlZ3c0ZWMifQ.QL12Y-CSawv6p7Ahx2lJhg`
  axios
    .get(mapboxAPI)
    .then(response => {
      const pos = {
        long: response.data.features[0].geometry.coordinates[0],
        lat: response.data.features[0].geometry.coordinates[1],
        placeName: response.data.features[0].place_name,
      }
      callback(pos, undefined)
    })

    .catch(error => {
      callback(
        undefined,
        'Unable to use the API and could not get the location coordinates'
      )
    })
}

module.exports = geocode
