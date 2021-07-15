"use strict"
import mongoose from "mongoose"
import OrderSchema from "../models/schema-order"
const Order = mongoose.model("Order", OrderSchema)

const OrderRepository = {
  async get() {
    let res = await Order.find({}, "number status items customer")
      .populate("customer", "name")
      .populate("items.Produto ", "title")
    return res
  },
  async posts(data) {
    let order = new Order(data)
    await order.save()
  }
}

export default OrderRepository
