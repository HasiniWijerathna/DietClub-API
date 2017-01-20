'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const errorFactory = require('../services/errorFactory');
const validateInputs = require('../services/validateInputs');
const authRequired = require('../middlewares/authRequired');
/* GET all blogs listing. */
router.get('/', (req, res) => {
  // Return all Blogs
  models
  .Blog
  .findAll({
    attributes: ['id', 'name'],
    include: [models.Posts],
  })
    .then((allBlogs) => {
      res.json({
        results: allBlogs,
      });
    });
});

router.get('/:blogId', (req, res, next) => {
  // Return blog with ID 'blogId'
  models
  .Blog
  .find({
     where: {
       id: req.params.blogId,
     },
     include: [models.Posts],
   })
   .then((existingBlog) => {
      console.log(existingBlog);

      res.json(existingBlog);
   })
   .catch(next);
});

router.post('/', authRequired, (req, res, next) => {
  // Create new blog
 const name = req.body.name;
 const blogNameError = validateInputs.validateName(req, name);

  if (!blogNameError ) {
    models
    .Blog
    .create({
      name: req.body.name,
      UserId: req.user.userId,
    })
      .then((newBlog) => {
      res.json(newBlog);
    });
  } else {
    // console.log(blogNameError);
    next(blogNameError);
  }
});

router.put('/:blogId', (req, res, next) => {
  // Update blog with ID 'blogId'
  models
  .Blog
  .find({
    where: {
      id: req.params.blogId,
    },
  })
  .then((blog) => {
    let promise = null;
    const name = req.body.name;
    const blogNameError = validateInputs.validateName(req, name);

    if (blog && !blogNameError) {
      promise = blog.updateAttributes({
        name: req.body.name,
      });
    } else if (blogNameError) {
      next(blogNameError);
    } else {
      throw errorFactory.badRequest(req, 'Blog does not exist');
    }

    return promise;
  })
  .then((updatedBlog) => {
    res.send(updatedBlog);
  })
  .catch(next);
});

router.delete('/:blogId', (req, res, next) => {
  // Delete blog with ID 'blogId'
  models.Blog.destroy({
    where: {
      id: req.params.blogId,
    },
  })
  .then((deletedBlog) => {
    res.json(deletedBlog);
  });
});

module.exports = router;
