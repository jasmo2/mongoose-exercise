// live share
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const { Movies } = require('./connection')

router.get('/', async(req, res) => {
    const movieList = await Movies.find({})
    res.status(200).json({ Movies: movieList })
})

router.post('/', async(req, res) => {

})

module.exports = router
