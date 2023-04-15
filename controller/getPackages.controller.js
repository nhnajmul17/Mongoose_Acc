const Package = require("../model/package.model")

exports.getPackages = async (req, res) => {
    try {

        //filtering
        const filters = { ...req.query }
        const nonFilters = ["limit", "page", "sort"]
        nonFilters.map(item => delete filters[item])


        const queries = { limit: 2 }

        //Pagination
        if (req.query.page) {
            const { page = 1, limit = 2 } = req.query
            const skip = (page - 1) * parseInt(limit)
            queries.skip = skip
            queries.limit = parseInt(limit)
        }

        //sorting 
        if (req.query.sort) {
            const sortBy = req.query.sort
            queries.sortBy = sortBy
        }


        //get some specific Fields data
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ")
            queries.fields = fields
        }


        //Getting Actual Data
        const data = await Package.find({})
            .skip(queries.skip)
            .limit(queries.limit)
            .select(queries.fields)
            .sort(queries.sortBy)

        const totalPackage = await Package.countDocuments()

        res.status(200).json({
            success: "Success",
            message: "All Packge loaded Successfully",
            data: { totalPackage, data }

        })

    } catch (error) {
        res.status(400).json({
            success: "Failed To get Packages",
            message: error.message
        })
    }
}





exports.addPackage = async (req, res) => {
    try {
        const result = await Package.create(req.body)

        res.status(200).json({
            success: "Success",
            message: "Package Added Successfully",
            data: result

        })
    } catch (error) {
        res.status(400).json({
            success: "Failed",
            message: error.message
        })
    }
}


exports.specificPackage = async (req, res) => {
    try {
        const { id } = req.params
        const package = await Package.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true })

        res.status(200).json({
            success: "Success",
            message: "Package Found",
            data: package

        })
    } catch (error) {
        res.status(400).json({
            success: "Failed",
            message: error.message
        })
    }
}


exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Package.updateOne({ _id: id }, { $set: (req.body) }, { runValidators: true })
        res.status(200).json({
            success: "Success",
            message: "Package Updated ",
            data: result

        })

    } catch (error) {
        res.status(400).json({
            success: "Failed",
            message: error.message
        })
    }
}


exports.getTrendingPackages = async (req, res) => {
    try {
        const data = await Package.find({}).sort({ views: -1 }).limit(3)
        res.status(200).json({
            success: "Success",
            message: "Trendings Data",
            data: data

        })
    } catch (error) {
        res.status(400).json({
            success: "Failed",
            message: error.message
        })

    }

}


exports.getCheapestPackages = async (req, res) => {
    try {
        const data = await Package.find({}).sort({ packagePrice: 1 }).limit(3)
        res.status(200).json({
            success: "Success",
            message: "Cheapest Packages",
            data: data

        })
    } catch (error) {
        res.status(400).json({
            success: "Failed",
            message: error.message
        })

    }

}