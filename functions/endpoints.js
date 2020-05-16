const functions = require('firebase-functions')
const neatCsv = require('neat-csv')

const fs = require('fs').promises

function fillUserProducts (user, products, location) {
  for (var j = 0; j < products.length; j++) {
    if (products[j].Location === location) {
      user.products.push(products[j])
      products.splice(j, 1)
      j = j - 1

      if (user.products.length === 10) {
        return user
      }
    }

    if (j === (products.length - 1) && user.products.length < 10) {
      return fillUserProducts(user, products, 'any')
    }
  }
  return ''
}

exports.usersWithProducts = functions.https.onRequest(async (request, response) => {
  try {
    let usersCSV = await fs.readFile('./data/client-rev.csv', 'binary')
    let users = await neatCsv(usersCSV)

    let productsCSV = await fs.readFile('./data/product-rev.csv', 'binary')
    let products = await neatCsv(productsCSV)

    let usersWithProducts = []

    for (var i = 0; i < users.length; i++) {
      let user = users[i]
      user.products = []

      usersWithProducts.push(fillUserProducts(user, products, user.Location))
    }

    response.status(200).send(usersWithProducts)
  } catch (error) {
    console.log(error)
    response.status(500).send('Server Error')
  }
})

// Here finishes the challenge, below are extra things
exports.allProductsAvailableForAUser = functions.https.onRequest(async (request, response) => {
  try {
    let usersCSV = await fs.readFile('./data/client-rev.csv', 'binary')
    let users = await neatCsv(usersCSV)

    let productsCSV = await fs.readFile('./data/product-rev.csv', 'binary')
    let products = await neatCsv(productsCSV)

    let usersWithProducts = []

    for (var i = 0; i < users.length; i++) {
      let user = users[i]
      user.products = []

      for (var j = 0; j < products.length; j++) {
        if (products[j].Location === user.Location || products[j].Location === 'any') {
          user.products.push(products[j])
        }
      }
      usersWithProducts.push(user)
    }

    response.status(200).send(usersWithProducts)
  } catch (error) {
    console.log(error)
    response.status(500).send('Server Error')
  }
})
