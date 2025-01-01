const express = require("express");
const OrderControllers = require("../controllers/OrderControllers")
const router = express.Router()
const { authUserMiddleWave } = require("../middleware/authMiddlewaer");

router.post('/create',OrderControllers.createOrder)
router.get('/get-order/:id',OrderControllers.getOrderDetails)
router.get('/get-order-details/:id',OrderControllers.getOrderDetail)
router.delete('/cancel-order/:id',OrderControllers.cancelOrderDetails)








module.exports = router