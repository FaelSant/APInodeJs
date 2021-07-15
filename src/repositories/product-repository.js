import mongoose from "mongoose"
import ProductSchema from "../models/schema-produto"
const Produtos = mongoose.model("Produtos", ProductSchema)

const ProductRepository = {
  async get() {
    const res = await Produtos.find(
      { active: true },
      "title slug price description "
    )
    return res
  },
  async getBySlugs(slug) {
    const res = await Produtos.findOne(
      {
        slug: slug,
        active: true,
      },
      "title slug price description tags "
    )
    return res
  },
  async getById(id) {
    const res = await Produtos.findById(id)
    return res
  },
  async getByTags(tags) {
    const res = await Produtos.find(
      {
        tags: tags,
        active: true,
      },
      "title description price slug tags"
    )
    return res
  },
  async posts(data) {
    let produto = new Produtos(data)
    await produto.save()
  },
  async put(id, data) {
    await Produtos.findByIdAndUpdate(id, {
      $set: {
        title: data.title,
        description: data.description,
        price: data.price,
      },
    })
  },
  async remove(id) {
    await Produtos.findOneAndRemove(id)
  },
}
export default ProductRepository
