import express from "express"
const router = express.Router()
import produtoController from "../controllers/produto-controller"
import { isAdmin } from "../services/auth-services"
//criando produto
const create = router.post("/", produtoController.posts)
//atualizar um produto
const put = router.put("/:id", isAdmin, produtoController.put)
//deletar um produto
const del = router.delete("/:id", isAdmin, produtoController.delete)
//listar os produtos
const get = router.get("/", produtoController.get)
//listar os produtos por slug
const getBySlugs = router.get("/:slug", produtoController.getBySlugs)
//listar os produtos por id
const getById = router.get("/ad/:id", produtoController.getById)
//listar os produtos passando tags
const getByTags = router.get("/tag/:tags", produtoController.getByTags)
export default router
