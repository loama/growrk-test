'use strict'
const express = require('express')
const app = express()

const functions = require('firebase-functions')
const cors = require('cors')
const endpoints = require('./endpoints')

try {
  app
    .use(express.json())
    .use(cors())

  // V1
    .get('/v1/usersWithProducts', (req, res) => endpoints.usersWithProducts(req, res))
    .get('/v1/allProductsAvailableForAUser', (req, res) => endpoints.allProductsAvailableForAUser(req, res))

  // catch all routes, 404
    .all('*', (req, res) => {
      console.log(req.originalUrl)
      res.status(404).send({
        info: 'not found'
      })
    })
} catch (error) {
  console.log(error)
  response.status(500).send('error')
}

const api = functions.https.onRequest(app)

module.exports = {
  api
}
