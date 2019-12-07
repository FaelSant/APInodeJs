'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) =>{
    let res = await Order.find({},'number status items customer')
    .populate('customer','name')
    .populate('items.Produto ','title');
    return res
}
exports.posts = async(data) =>{
    let order = new Order(data);
    await order.save()
}