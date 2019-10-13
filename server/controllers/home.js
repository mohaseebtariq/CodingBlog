const db = require('../config/db');

exports.publicFeed = async (req, res) => {
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
