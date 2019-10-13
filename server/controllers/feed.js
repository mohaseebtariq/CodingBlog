const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const db = require("../config/db");

exports.validatePost = (req, res, next) => {
  const {
    body: { title, content }
  } = req;

  const postSchema = Joi.object().keys({
    title: Joi.string()
      .min(5)
      .max(50)
      .trim()
      .required(),
    content: Joi.string()
      .min(10)
      .max(1000)
      .trim()
      .required()
  });

  const validate = Joi.validate(req.body, postSchema);
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

exports.createPost = async (req, res) => {
  const {
    body: { title, content }
  } = req;

  const date = new Date();
  const currentDateTime = date.toLocaleString();

  try {
    const userId = req.userId;
    const username = req.username;
    const post = await db.posts.create({
      title: title,
      content: content,
      created_at: currentDateTime,
      user_id: userId,
      username: username
    });
    const response = {
      id: post.dataValues.id,
      title: post.dataValues.title,
      content: post.dataValues.content,
      created_at: post.dataValues.created_at,
      username: post.dataValues.username
    }
    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const findPost = await db.posts.findByPk(postId);
    if (!findPost) {
      throw "Not Found";
    } else {
      res.status(200).json({
        id: findPost.id,
        user_id: findPost.user_id,
        title: findPost.title,
        content: findPost.content,
        username: findPost.username,
        created_at: findPost.created_at
      });
    }
  } catch (err) {
    res.status(404).json({ Error: err });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const token = req.headers["auth-token"];

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const uid = verified.id;

    const posts = await db.posts.findAll({ where: { user_id: uid } });
    if (!posts.length) {
      throw "No Post Found";
    }
    const fetchPost = posts.map(post => {
      return {
        id: post.id,
        userId: post.user_id,
        username: post.username,
        title: post.title,
        content: post.content,
        createdAt: post.created_at
      };
    });
    return res.status(200).json(fetchPost);
  } catch (err) {
    return res.status(204).send();
  }
};

exports.deleteSinglePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;
    const findPost = await db.posts.findAll({
      where: { id: postId, user_id: userId }
    });
    // const findPost = await db.posts.findByPk(postId);
    if (findPost.length === 0) {
      throw "Post not found";
    } else {
      let response;
      findPost.map(post => {
        post.destroy();
        response = {
          id: post.dataValues.id,
          title: post.dataValues.title,
          content: post.dataValues.content,
          created_at: post.dataValues.created_at,
          username: post.dataValues.username
        }
      });

      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({ Error: err });
  }
};


exports.updateSinglePost = async (req, res) => {
  const userId = req.userId;
  try {
    const {
      body: { title, content }
    } = req;
    const postId = req.params.postId;
    const findPost = await db.posts.findAll({
      where: { id: postId, user_id: userId }
    });

    if (findPost.length === 0) {
      throw "Post not found";
    } else {
      let response;
      const updatedPost = findPost.map(post => {
        post.update({ title: title, content: content });
        response = {
          id: post.dataValues.id,
          title: post.dataValues.title,
          content: post.dataValues.content,
          created_at: post.dataValues.created_at,
          username: post.dataValues.username
        }
      });
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({ Error: err });
  }
};
