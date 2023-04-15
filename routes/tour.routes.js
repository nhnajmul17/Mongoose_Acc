const express = require("express")
const { getPackages, specificPackage, addPackage, updatePackage, getTrendingPackages, getCheapestPackages } = require("../controller/getPackages.controller")
const tourRouter = express.Router()

tourRouter.route("/")
    .get(getPackages)
    .post(addPackage)


tourRouter.route("/trending").get(getTrendingPackages)
tourRouter.route("/cheapest").get(getCheapestPackages)
tourRouter.route("/:id").get(specificPackage).patch(updatePackage)



module.exports = tourRouter