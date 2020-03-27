const axios = require('axios')
const express = require('express')

const { Movies } = require('../connection')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const queryResult = await Movies.find({})
    res.render('index', { queryResult })
  } catch (err) {
    res.status(500)
    res.render('error')
  }
})

router.delete('/', async (req, res) => {
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

router.put('/', async (req, res) => {
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

router.post('/', async (req, res) => {
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

module.exports = router
