'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');

/* GET all comments listing. */
router.get('/', (req, res) => {
  // Return all Blogs
  models
  .Comments
  .findAll({
    attributes: ["id", "comment"]
  })
    .then((allComments) => {
    res.json(allComments);
  });
});

router.post('/', (req, res) => {
  // Create new comment
  models
  .Comments
  .create({
    comment: req.body.comment
  })
    .then((newComment) => {
    res.json(newComment);
  });
});

router.get('/:commentId', (req, res, next) => {
  // Return comment with ID 'commentId'
  models
  .Comments
  .find({
     where: {
       id: req.params.commentId
     }
   })
   .then((existingComment) => {
     let promise = null;

     if(existingComment) {
       promise = res.json(existingComment);
     } else {
       throw errorFactory.badRequest(req, 'comment does not exist');
     }
     return promise;
      // console.log(existingComment);
      // res.json(existingComment);
   })
   .catch(next);
});

router.put('/:commentId', (req, res, next) => {
  // Update comment with ID 'commentId'
  models
  .Comments
  .find({
    where: {
      id: req.params.commentId
    }
  })
  .then((comment) => {
    let promise = null;

    if (comment) {
      promise = comment.updateAttributes({
        comment: req.body.comment
      })
    } else {
      throw errorFactory.badRequest(req, 'comment does not exist');
    }

    return promise;
  })
  .then((updatedComment) => {
    res.send(updatedComment);
  })
  .catch(next);
});

router.delete('/:commentId', (req, res, next) => {
  // Delete comment with ID 'commentId'
  models.Comments.destroy({
    where: {
      id: req.params.commentId
    }
  }).then(function(deletedComment) {
    res.json(deletedComment);
  });
});

module.exports = router;