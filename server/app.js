const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/user');
const userRoutes = require('./routes/feed');
const homeRoutes = require('./routes/home');
const commentRoutes = require('./routes/comment');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Only for development on localhost remove when deploy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/post', commentRoutes);

const db = require('./config/db');

db.sequelize.sync().then();

module.exports = app;
