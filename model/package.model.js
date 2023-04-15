const { default: mongoose } = require("mongoose");

const packageSchema = mongoose.Schema({

    packageName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true,
        min: [0, "Price Can't be Negative"]
    },
    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

// packageSchema.post("findOne", function (doc, next) {

//     if (!doc.count) {
//         let count = 1
//         const newDoc = { ...doc._doc, count: count }

//         const update = Package.updateOne({ _id: doc._id }, { $set: { doc: newDoc } })
//         console.log(update)
//     } else {
//         doc.count += 1
//     }

//     next()
// })

const Package = mongoose.model("Package", packageSchema)

module.exports = Package