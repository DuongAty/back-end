const express = require("express");
const ProductControllers = require("../controllers/ProductControllers")
const router = express.Router()
const { authMiddleWave } = require("../middleware/authMiddlewaer");
router.post('/create', ProductControllers.createProduct)
router.put('/update/:id', authMiddleWave, ProductControllers.updateProduct)
router.get('/get-details/:id', ProductControllers.getDetailProduct)
router.delete('/delete/:id', authMiddleWave, ProductControllers.deleteProduct)
router.get('/get-all', ProductControllers.getAllProduct)
router.post('/delete-many', authMiddleWave, ProductControllers.deleteMany)
router.get('/get-all-type', ProductControllers.getAllType)






module.exports = router