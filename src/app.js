import express from "express"
const app = express()
import moongoose from "mongoose"
import bodyParser from "body-parser"
import config from "./config"
import auth from "./services/auth-services"
// Conectando ao banco de dados
moongoose.connect(config.connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
// Carregando Models
import custumerModel from "./models/schema-customer"
import produtoModel from "./models/schema-produto"
import orderModel from "./models/schema-order"
//carregando rotas
import index from "./routes/index"
import produtos from "./routes/produtos"
import customer from "./routes/customer"
import order from "./routes/order"
app.use(
  bodyParser.json({
    limit: "5mb",
  })
)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", index)
app.use("/produtos", produtos)
app.use("/customers", customer)
app.use("/orders", order)

export default app
