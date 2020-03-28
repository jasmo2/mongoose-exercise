// En este archivo creare el Schema para movies

const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    rank: Number,
    id: { type: String, unique: true },
})

class Movie {
    static async findAndInsertMany(moviesJSON) {
        const movies = await this.find({})
        const ids = movies.map((movie) => {
            return movie.id
        })

        const filterMovies = moviesJSON.filter((movie) => {
            return !ids.some((ID) => ID === movie.id)
        })

        return this.insertMany(filterMovies)
    }
}

movieSchema.loadClass(Movie)

module.exports = movieSchema