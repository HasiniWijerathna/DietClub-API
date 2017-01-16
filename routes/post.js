'use strict';
const express = require('express');
const router = express.Router();

const models = require('../models/index');
const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');
const validateInputs = require('../services/validateInputs');

router.get('/', (req, res) => {
  // Return all posts
  models
  .Posts
  .findAll({
    attributes: ["id", "title", "content"]
  })
    .then((allPosts) => {
    res.json(allPosts);
  });
});

router.post('/', (req, res, next) => {
  // Create new post
  let title = req.body.title;
  let content = req.body.content;
  let blogId = req.body.blogId;
  let titleError = validateInputs.validateName(req,title);
  let contentError = validateInputs.validateName(req,content);
  //not found
  if (titleError || contentError) {
    next(titleError);
  } else {
    models
    .Posts
    .create({
      title: req.body.title,
      content: req.body.content,
      blogId: req.body.id
    })
      .then((newPost) => {
      res.json(newPost);
    });
  }
});

router.get('/:postId', (req, res, next) => {
  // Return post with ID 'postId'
  models
  .Posts
  .find({
     where: {
       id: req.params.postId
     }
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
      id: req.params.postId
    }
  })
  .then((post) => {
    let promise = null;

    if (post) {
      promise = post.updateAttributes({
        title: req.body.title,
        content: req.body.content
      })
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
      id: req.params.postId
    }
  }).then(function(deletedPost) {
    res.json(deletedPost);
  });
});



module.exports = router;
