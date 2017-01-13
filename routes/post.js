'use strict';
const express = require('express');
const router = express.Router();

const models = require('../models/index');
const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');

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

router.post('/', (req, res) => {
  // Create new post
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
      console.log(existingPost);

      res.json(existingPost);
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
      throw errorFactory.badRequest(req, 'post does not exist');
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
