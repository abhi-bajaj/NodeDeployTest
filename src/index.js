const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Static config for public directory
app.use(express.static(publicDirectoryPath))

// Handlebar config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abhi',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Abhi',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Abhi',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must enter an address',
    })
  }

  geocode(req.query.address, (pos, error) => {
    if (error) {
      return res.send({ error })
    }

    forecast(pos, (response, error) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: response,
        location: pos.placeName,
        address: req.query.address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help 404',
    name: 'Abhi',
    error: 'Help Article does not exist',
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Abhi',
    error: 'General 404 error',
  })
})

app.listen(3000, () => {
  console.log('Server started on poert 3000')
})
