const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    leads: [{ type: Types.ObjectId, ref: 'Lead' }]
})

module.exports = model('User', schema);
