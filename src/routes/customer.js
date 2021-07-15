import express from "express"
import { CustomerController } from "../controllers/customer-controller"
import { authorize } from "../services/auth-services"

const router = express.Router()

router.post("/", CustomerController.posts)
router.delete("/:id", CustomerController.remove)
router.get("/", CustomerController.get)
router.post("/authenticate", CustomerController.authenticate)
router.post("/refresh-token", authorize, CustomerController.refreshToken)

export default router
