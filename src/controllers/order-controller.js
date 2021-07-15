import OrderRepository from "../repositories/order-repository"
import guid from "guid"
import { decodeToken } from "../services/auth-services"

const OrderController = {
  async get(req, res, next) {
    try {
      let data = await OrderRepository.get()
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro de execução",
      })
    }
  },
  async posts(req, res, next) {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"]
      const data = await decodeToken(token)
      await OrderRepository.posts({
        customer: data.id,
        number: guid.raw().substring(0, 6),
        items: req.body.items,
      })
      res.status(201).send({
        message: "Pedido cadastrado",
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
}

export default OrderController
