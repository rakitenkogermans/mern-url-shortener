const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

//Export model result, where our model is User which works by 'schema'
module.exports = model('User', schema);
