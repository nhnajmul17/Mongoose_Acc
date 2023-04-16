const mongoose = require("mongoose")
const app = require("./app")
const dotenv = require("dotenv").config()
const { red } = require("colors")

const Port = process.env.PORT || 5000

mongoose.connect(`${process.env.DB_URL}`).then(() => {
    console.log("Mongodb Server connected".blue.bold)
})

app.listen(Port, () => {
    console.log(`Listening Tour Server at ${Port}`.yellow.bold)
})
