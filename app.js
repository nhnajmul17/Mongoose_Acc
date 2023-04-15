const express = require("express")
const cors = require("cors")
const tourRouter = require("./routes/tour.routes")
const dotenv = require("dotenv").config()


const app = express()



app.use(cors())
app.use(express.json())


app.use("/api/v1/tour", tourRouter)



app.get('/', (req, res) => {
    res.send("Tour Server")
})


module.exports = app