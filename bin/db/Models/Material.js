const mongoose = require("../connection");
const {
    MaterialSchemaImage
}  = require('../Schemas/Material');

const MaterialImageModel = mongoose.model(
    "MaterialImageList",
    MaterialSchemaImage,
    "MaterialImageList",
)

module.exports =  {
    MaterialImageModel
}