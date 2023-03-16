const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers")

router.post('/', userController.UserSignUp);
router.post('/login', userController.UserLogin);
router.get('/', userController.getUsers)
router.delete('/:id', userController.deleteUsers);

//router.put("/:id", userController.updateUsers);
router.post("/:userId/orders", userController.addProductforUser);
router.delete("/:userId/orders/:orderId",userController.deleteOrderForUser);
router.get("/:email", userController.getUsersbyId);
router.put("/:userId", userController.updateOrderforUser);


module.exports = router;