const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ UserController }) {
  const router = Router();

  router.get("", [AuthMiddleware], UserController.getAll);
  router.get("/:userId", UserController.get);
  router.patch("/:userId", UserController.update);
  router.delete("/:userId", UserController.delete);

  return router;
};
