// live share
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const { Movies } = require('../connection')

router.get('/', async(req, res) => {
    const movieList = await Movies.find({})
    res.status(200).json({ Movies: movieList })
})

//crear pelicula
router.post('/', async(req, res) => {
    const newMovie = req.body
    const oldMovie = await Movies.create(newMovie)
    res.status(200).json({ success: true })
})

//actualizar pelicula
router.put('/:movieId', async(req, res) => {
    const { movieId } = req.params
    console.log("TCL: movieId", movieId)
    const newMovie = req.body
    console.log("TCL: newMovie", newMovie)
    try {
        const oldMovie = await Movies.findOneAndUpdate({ id: movieId }, newMovie)
        if (oldMovie) {
            console.log('TCL: oldMovie', oldMovie)
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ Movie: 'movie not found' })
        }

    } catch (error) {
        console.log('TCL: error', error)

        res.status(500).json({ error })
    }
})

//Borrar pelicula
router.delete('/', async(req, res) => {
    const { title } = req.body
    try {
        const movieToDelete = await Movies.findOneAndDelete({ title: { $regex: title, $options: 'i' } })
        res.status(200).json({ success: `Movie "${movieToDelete.title}" deleted` })
    } catch (error) {
        res.status(500).json({ error })

    }


})


module.exports = router