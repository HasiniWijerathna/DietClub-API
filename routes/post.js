'use strict';
const express = require('express');
const router = express.Router();

const models = require('../models/index');
const errorFactory = require('../services/errorFactory');
const validateInputs = require('../services/validateInputs');
const authRequired = require('../middlewares/authRequired');

router.get('/', (req, res) => {
  // Return all posts
  models
  .Posts
  .findAll({
    attributes: ['id', 'title', 'content'],
  })
    .then((allPosts) => {
    res.json(allPosts);
  });
});

router.post('/', authRequired, (req, res, next) => {
  // Create new post
  const title = req.body.title;
  const content = req.body.content;
  const titleError = validateInputs.validateName(req, title);
  const contentError = validateInputs.validateName(req, content);

  if (titleError || contentError) {
    next(contentError);
  } else {
    models
    .Posts
    .create({
      title: req.body.title,
      content: req.body.content,
      BlogId: req.body.blogId,
    })
      .then((newPost) => {
      res.json(newPost);
    })
    .catch(next);
  }
});

router.get('/:postId', (req, res, next) => {
  // Return post with ID 'postId'
  models
  .Posts
  .find({
     where: {
       id: req.params.postId,
     },
   })
   .then((existingPost) => {
     let promise = null;

    if(existingPost) {
      promise = res.json(existingPost);
    } else {
      throw errorFactory.badRequest(req, 'Post does not exist');
    }
      // console.log(existingPost);
      //
      // res.json(existingPost);
   })
   .catch(next);
});

router.put('/:postId', (req, res, next) => {
  // Update post with ID 'postId'
  models
  .Posts
  .find({
    where: {
      id: req.params.postId,
    },
  })
  .then((post) => {
    let promise = null;

    if (post) {
      promise = post.updateAttributes({
        title: req.body.title,
        content: req.body.content,
      });
    } else {
      throw errorFactory.badRequest(req, 'Post does not exist');
    }

    return promise;
  })
  .then((updatedPost) => {
    res.send(updatedPost);
  })
  .catch(next);
});

router.delete('/:postId', (req, res, next) => {
  // Delete post with ID 'postId'
  models.Posts.destroy({
    where: {
      id: req.params.postId,
    },
  }).then(function(deletedPost) {
    res.json(deletedPost);
  });
});

module.exports = router;
