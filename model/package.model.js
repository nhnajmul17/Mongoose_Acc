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
    }

}, {
    timestamps: true
})

const Package = mongoose.model("Package", packageSchema)

module.exports = Package