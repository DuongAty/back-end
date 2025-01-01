const express = require("express");
const UserController = require("../controllers/UserController");
const { authMiddleWave,authUserMiddleWave } = require("../middleware/authMiddlewaer");
const router = express.Router()

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logoutUser)
router.put('/update-user/:id',UserController.updateUser)
router.delete('/delete-user/:id',UserController.deleteUser)
router.get('/getAll',UserController.getAllUser)
router.get('/get-details/:id',UserController.getDetailsUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/delete-many',UserController.deleteMany)


module.exports = router