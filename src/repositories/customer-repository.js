"use strict"
import { model } from "mongoose"
import CustomerSchema from "../models/schema-customer"
const Customer = model("Custumer", CustomerSchema)

const CustomerRepository = {
  async posts(data) {
    let customer = new Customer(data)
    await customer.save()
  },
  async remove(id) {
    await Customer.findOneAndRemove(id)
  },
  async get() {
    const res = await Customer.find()
    return res
  },
  async authenticate(data) {
    const res = await Customer.findOne({
      email: data.email,
      password: data.password,
    })
    return res
  },
  async getById(id) {
    const res = await Customer.findById(id)
    return res
  },
}
export default CustomerRepository
