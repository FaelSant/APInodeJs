import express from "express"
const router = express.Router()

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "API DE TESTE do Fael",
    version: "1.0.0",
  })
})

export default router
