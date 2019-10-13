const db = require("../config/db");
const Joi = require("@hapi/joi");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.posts.findAll();
    const fetchPost = posts.map(post => {
      return {
        id: post.id,
        userId: post.user_id,
        title: post.title,
        content: post.content,
        username: post.username,
        createdAt: post.created_at
      };
    });
    return res.status(200).json(fetchPost);
  } catch (err) {
    return res.status(204).send();
  }
};

exports.getUsers = async (req, res) => {
  const role = "admin";
  try {
    const findUsers = await db.users.findAll();
    const fetchUsers = findUsers
      .filter(users => {
        return users.role !== role;
      })
      .map(data => {
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role
        };
      });
    return res.status(200).json(fetchUsers);
  } catch (err) {
    return res.status(204).send();
  }
};

exports.updateUserRole = async (req, res) => {
  const schema = Joi.object().keys({
    role: Joi.string()
      .lowercase()
      .valid(["admin", "user", "disabled"])
      .required()
  });

  const valid = Joi.validate(req.body, schema);
  const { value, error } = valid;

  if (error) {
    const { details } = error;
    const message = details.map(err => err.message).join(",");
    return res.status(422).json({ error: message });
  } else {
    try {
      const userRole = req.body.role;
      const userId = req.params.userId;
      const findPost = await db.users.findByPk(userId);
      if (!findPost) {
        throw "User not Found";
      } else {
        let response;
        findPost.update({ role: userRole });
        response = {
          id: findPost.dataValues.id,
          username: findPost.dataValues.username,
          email: findPost.dataValues.email,
          role: findPost.dataValues.role
        }
        res.status(200).json(response);
      }
    } catch (err) {
      res.status(404).json({ message: err });
    }
  }
};


exports.deleteAllPosts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const findPost = await db.posts.findAll({ where: { user_id: userId } });
    if (findPost.length === 0) {
      throw "Not Found";
    } else {
      findPost.map(post => {
        return post.destroy();
      });
      return res.status(200).json({ message: "All Posts Successfully Deleted" });
    }
  } catch (err) {
    return res.status(404).json({ Error: err });
  }
};
