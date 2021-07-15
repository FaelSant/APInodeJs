import CustomerRepository from "../repositories/customer-repository"
import md5 from "md5"
import { generateToken } from "../services/auth-services"

export const CustomerController = {
  async posts(req, res, next) {
    try {
      await CustomerRepository.posts({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
        roles: ["user"],
      })
      res.status(201).send({
        message: "Cliente cadastrado",
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async remove(req, res, next) {
    try {
      await CustomerRepository.delete(req.params.id)
      res.status(200).send({
        message: "Cliente removido com sucesso!",
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua solicitação",
      })
    }
  },
  async get(req, res, next) {
    try {
      let data = await CustomerRepository.get()
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro de execução",
      })
    }
  },
  async authenticate(req, res, next) {
    try {
      const customer = await CustomerRepository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
      })
      if (!customer) {
        res.status(404).send({
          message: "Usuário ou senha invalidos",
        })
        return
      }
      const token = await generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles,
      })
      res.status(201).send({
        token: token,
        data: {
          name: customer.name,
          email: customer.email,
        },
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async refreshToken(req, res, next) {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"]
      const data = await authService.decodeToken(token)

      const customer = await CustomerRepository.getById(data.id)
      if (!customer) {
        res.status(404).send({
          message: "Cliente nao encontrado",
        })
        return
      }
      const tokenData = await authService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles,
      })
      res.status(201).send({
        token: token,
        data: {
          name: customer.name,
          email: customer.email,
        },
      })
    } catch (e) {
      console.log(e)
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
}
