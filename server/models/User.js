"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin", "disabled"]
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    },
    {
      paranoid: true,
      underscored: true
    }
  );
  return Users;
};
