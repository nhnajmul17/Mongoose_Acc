const express = require("express")
const { getPackages, specificPackage, addPackage } = require("../controller/getPackages.controller")
const tourRouter = express.Router()

tourRouter.route("/")
    .get(getPackages)
    .post(addPackage)


tourRouter.route("/:id").get(specificPackage)



module.exports = tourRouter