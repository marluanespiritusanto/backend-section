const BaseService = require("./base.service");
let _commentRepository = null,
  _ideaRepository = null;

class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
    _ideaRepository = IdeaRepository;
  }

  async getIdeaComments(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }

    const { comments } = idea;
    return comments;
  }

  async createComment(comment, ideaId, userId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = "idea does not exist";
      throw error;
    }

    const createdComment = await _commentRepository.create({
      ...comment,
      author: userId
    });
    idea.comments.push(createdComment);

    return await _ideaRepository.update(ideaId, { comments: idea.comments });
  }
}

module.exports = CommentService;
