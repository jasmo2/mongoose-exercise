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
const bodyParser = require('body-parser')
const express = require('express')
const methodOverride = require('method-override')

const htmlApp = require('./routes')
const api = require('./routes/api')

const portNumber = process.env.PORT || 3000

const app = express()

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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

app.use('/', htmlApp)
app.use('/api', api)
app.set('view engine', 'ejs')

app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
