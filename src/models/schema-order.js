import mongoose from "mongoose"
const { Schema } = mongoose

const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId, // add a auto-generated ID
    ref: "Custumer",
  },
  number: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["done", "created"],
    default: "created",
  },
  items: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
      },
    },
  ],
})
export default OrderSchema
