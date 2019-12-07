'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model('Custumer');
exports.posts = async(data) =>{
    let customer = new Customer(data);
    await customer.save()
}
exports.delete = async(id) =>{

    await Customer
    .findOneAndRemove(id)
}
exports.get = async() =>{
    const res = await Customer
        .find()
    return res
}
exports.authenticate = async(data) =>{
    const res = await Customer
        .findOne({
            email:data.email,
            password:data.password
        });
    return res
}
exports.getById = async(id) =>{
    const res = await Customer.findById(id)
    return res
}