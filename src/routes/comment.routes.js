const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ CommentController }) {
  const router = Router();

  router.get("/:commentId/unique", CommentController.get);
  router.get("/:ideaId", CommentController.getIdeaComments);
  router.post("/:ideaId", AuthMiddleware, CommentController.createComment);
  router.patch("/:commentId", AuthMiddleware, CommentController.update);
  router.delete("/:commentId", AuthMiddleware, CommentController.delete);

  return router;
};
