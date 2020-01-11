const { Router } = require("express");
const { ParseIntMiddleware } = require("../middlewares");

module.exports = function({ IdeaController }) {
  const router = Router();

  router.get("", ParseIntMiddleware, IdeaController.getAll);
  router.get("/:ideaId", IdeaController.get);
  router.get("/:userId/all", IdeaController.getUserIdeas);
  router.post("", IdeaController.create);
  router.patch("/:ideaId", IdeaController.update);
  router.delete("/:ideaId", IdeaController.delete);
  router.post(":ideaId/upvote", IdeaController.upvoteIdea);
  router.post(":ideaId/downvote", IdeaController.downvoteIdea);

  return router;
};
