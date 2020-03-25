/**
 * Con base al JSON
 https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json
 *
   *   Insertar de forma multiple las peliculas que aparecen aquí.
     * Y     verifivar si se guardaron de forma correcta.
   * 
 

 * Hint * que se consulte  y haga el guarddo en la base de Datos
 */

/**
 * AJAX
 * Asynchronous Javascript And XML
 * Un llamado asyncrono entre servidores
 *
 * Lo vamos a hacer con la librería AXIOS
 */
require('dotenv').config()
const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const methodOverride = require('method-override')

const { Movies } = require('./connection')
const portNumber = process.env.PORT || 3000

const app = express()

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
  })
)

app.set('view engine', 'ejs')

app.get('/', async (req, res, next) => {
  try {
    const queryResult = await Movies.find({})
    res.render('index', { queryResult })
  } catch (err) {
    res.status(500)
    res.render('error')
  }
})

app.delete('/', async (req, res) => {
  const {
    body: { id },
  } = req
  try {
    const deleteRes = await Movies.findByIdAndDelete(id)
    console.log('TCL: deleteRes', deleteRes)
  } catch (err) {
    console.error(err)
  }
  res.redirect(302, '/')
})

app.put('/', async (req, res) => {
  const {
    body: { id, rank, title },
  } = req
  try {
    const updateRes = await Movies.findByIdAndUpdate(id, {
      rank,
      title,
    })
  } catch (error) {
    console.error(err)
  }
  res.redirect(302, '/')
})

app.post('/', async (req, res) => {
  try {
    const { data: movies } = await axios.get(
      'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'
    )

    const result = await Movies.findAndInsertMany(movies)
    console.log('TCL: result', result)
  } catch (error) {
    console.error(error)
  }

  res.redirect(302, '/')
})

app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
