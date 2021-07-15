import express from "express"
import orderController from "../controllers/order-controller"
import { authorize } from "../services/auth-services"

const router = express.Router()

router.post("/", authorize, orderController.posts)
router.get("/", authorize, orderController.get)

export default router
