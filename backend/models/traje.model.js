const mongoose = require('mongoose');
const {Schema} = require("mongoose");


const trajesSchema = new Schema({
        nombre: {type: String, required: true},
        material: {type: String, required: true},
        propietario: {type: String, required: true},
       
    },
    {versionKey: false}
    );

module.exports = mongoose.model('Trajes', trajesSchema, 'trajes2026');