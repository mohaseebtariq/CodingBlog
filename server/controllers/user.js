const db = require("../config/db");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

exports.validateUser = (req, res, next) => {
  const {
    body: { email, username, password }
  } = req;

  const userSchema = Joi.object().keys({
    role: Joi.any().forbidden(),
    username: Joi.string()
      .token()
      .min(6)
      .max(20)
      .required()
      .trim(),
    email: Joi.string()
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .min(8)
      .max(50)
      .trim()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=!@#\_$-%\^&\*])(?=.{8,})/
      )
      .required()
      .error(errors => {
        errors.forEach(err => {
          if (err.type === "string.regex.base") {
            err.message =
              "password must contain at least one uppercase, lowercase, numeric and a special character";
          }
        });
        return errors;
      })
  });

  const result = Joi.validate(req.body, userSchema);
  const { value, error } = result;

  if (error) {
    const { details } = error;

    const message = details.map(err => err.message).join(",");
    return res.status(422).json({ error: message });
  } else {
    req = value;
    next();
  }
};

exports.registerUser = async (req, res) => {
  const {
    body: { username, password, email }
  } = req;
  const hashedPassword = await bcrypt.hash(password, 8);
  const date = new Date();
  const currentDateTime = date.toLocaleString();
  const mail = email.toLowerCase();
  const status = "user";

  try {
    const [user, created] = await db.users.findOrCreate({
      where: { [Op.or]: [{ username: username }, { email: mail }] },
      defaults: {
        username: username,
        email: mail,
        password: hashedPassword,
        role: status,
        created_at: currentDateTime
      }
    });
    if (created) {
      let users = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
        created_at: user.dataValues.created_at
      }
      return res.status(201).json(users);
    }
    return res
      .status(303)
      .json({ Message: "Username or email already exists" });
  } catch (err) {
    // const details  = err.errors.map(e => e.message).join(',');
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

exports.validateLoginUser = (req, res, next) => {
  const loginSchema = Joi.object().keys({
    username: Joi.string()
      .max(20)
      .trim()
      .required(),
    password: Joi.string()
      .trim()
      .required()
  });
  const result = Joi.validate(req.body, loginSchema);

  const { value, error } = result;

  if (error) {
    const { details } = error;
    const validateError = details.map(e => e.message).join(",");
    return res.status(422).json({ error: validateError });
  } else {
    req = value;
    next();
  }
};

exports.authenticateUser = async (req, res, next) => {
  const {
    body: { username, password }
  } = req;

  try {
    const user = await db.users.findOne({ where: { username: username } });
    if (user === null) {
      throw "Invalid Username";
    } else {
      const hashedPassword = user.password;
      const validPassword = await bcrypt.compare(password, hashedPassword);
      if (!validPassword) {
        throw "Invalid Password";
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ "auth-token": token });
      }
    }
  } catch (err) {
    next(err);
    return res.status(401).json({ Error: err });
  }
};
