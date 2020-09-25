const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    title:{
        type: String,
        required:true,
        trim:true
    },
    slug: { // o que irá compor a URL do produto. Portanto, deve ser unico e deve ter indice para facilitar uma busca. ex: PC GAMER = pc-gamer
        type: String,
        trim:true,
        index:true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    active:{
        type:Boolean,
        default: true
    },
    tags: [{
        type: String,
    }],
    image:{
        type: String,
        trim:true
    }
});

module.exports = mongoose.model('Produto',schema);