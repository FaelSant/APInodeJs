'use strict'
const mongoose = require('mongoose');
const Produtos = mongoose.model('Produto');

exports.get = async() =>{
    const res = await Produtos
        .find({active:true },'title slug price description ')
    return res
}

exports.getBySlugs = async(slug) =>{
   const res = await Produtos
    .findOne({
        slug:slug,
        active:true}
        ,'title slug price description tags ')
    return res
}
exports.getById = async(id) =>{
    const res = await Produtos
    .findById(id)
    return res
}
exports.getByTags = async(tags) =>{
   const res = await Produtos
    .find({
        tags:tags,
        active:true,   
    }, 'title description price slug tags')
    return res
}
exports.posts = async(data) =>{

    let produto = new Produtos(data);
    await produto.save()
}
exports.put = async(id,data) =>{

     await Produtos
        .findByIdAndUpdate(id,{
            $set:{
            title:data.title,
            description:data.description,
            price:data.price
      }
  })
}
exports.delete = async(id) =>{

    await Produtos
    .findOneAndRemove(id)
}