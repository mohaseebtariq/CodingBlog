const db = require("../config/db");
const Joi = require("@hapi/joi");

exports.validateComments = (req, res, next) => {
  const {
    body: { content }
  } = req;

  const schema = Joi.object().keys({
    content: Joi.string()
      .min(10)
      .max(1000)
      .trim()
      .required()
  });

  const validate = Joi.validate(req.body, schema);

  const { value, error } = validate;

  if (error) {
    const { details } = error;
    const message = details.map(err => err.message).join(",");
    return res.status(422).json({ error: message });
  } else {
    req = value;
    next();
  }
};

exports.postComments = async (req, res) => {
  try {
    const {
      body: { content }
    } = req;
    const postId = req.params.postId;
    const username = req.username;
    const date = new Date();
    const currentDateTime = date.toLocaleString();
    const comment = await db.comments.create({
      post_id: postId,
      content: content,
      commenter_username: username,
      created_at: currentDateTime
    });
    let response = {
      id: comment.dataValues.id,
      post_id: comment.dataValues.post_id,
      content: comment.dataValues.content,
      username: comment.dataValues.commenter_username,
      created_at: comment.dataValues.created_at
    };
    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await db.comments.findAll();

    const fetchPost = comments.map(comment => {
      return {
        id: comment.id,
        post_id: comment.post_id,
        content: comment.content,
        commenter_username: comment.commenter_username,
        createdAt: comment.created_at
      };
    });
    return res.status(200).json(fetchPost);
  } catch (err) {
    return res.status(204).send();
  }
};
