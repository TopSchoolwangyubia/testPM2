const { Schema } = require("mongoose");

const MaterialSchemaImage = new Schema({
    media_id: String,
    name: String,
    update_time: Number,
    oss_update_time: Number,
    url: String,
    oss_url: String
})

module.exports = {
    MaterialSchemaImage
}