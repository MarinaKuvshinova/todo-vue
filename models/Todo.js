const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = new Schema({
    _id: ObjectId,
    title: String
});

module.exports = mongoose.model('Todo', schema);