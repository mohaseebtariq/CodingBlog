'use strict'

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    username: {
      type: DataTypes.STRING(25),
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    paranoid: true,
    underscored: true
  });
  return Posts;
};
