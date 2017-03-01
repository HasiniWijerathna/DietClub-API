'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const errorFactory = require('../services/errorFactory');
const validateInputs = require('../services/validateInputs');
const authRequired = require('../middlewares/authRequired');
const userIdentifier = require('../middlewares/userIdentifier');
const modelDeleteAuthorizer = require('../middlewares/modelDeleteAuthorizer').bind(null, models.Blog, 'blogId');
const modelEditAuthorizer = require('../middlewares/modelEditAuthorizer').bind(null, models.Blog, 'blogId');

/* GET all blogs listing. */
router.get('/', userIdentifier, (req, res) => {
  // Return all Blogs

  const userWhereClause = {};
  if (req.user) {
    userWhereClause.UserId = req.user.id;
  }

  models
  .Blog
  .findAll({
    attributes: ['id', 'name'],
   include: [models.Posts, models.User],

    //  include: [models.Posts],
    order: [
      ['name', 'ASC'],
    ],
  })
    .then((allBlogs) => {
      console.log(allBlogs);
      res.json({
        results: allBlogs,
      });
    });
});

router.get('/:blogId', userIdentifier, (req, res, next) => {
  // Return blog with ID 'blogId'
  models
  .Blog
  .find({
     where: {
       id: req.params.blogId,
     },
     include: [models.Posts, models.BlogCount, models.User],
   })
  .then((existingBlog) => {
    let promise = null;

    if(existingBlog) {
      promise = res.json(existingBlog);
    } else {
      throw errorFactory.notFound(req, 'Blog does not exist');
    }
    return promise;
  })
  .catch(next);
});

router.post('/', userIdentifier, authRequired, (req, res, next) => {
  // Create new blog
 const name = req.body.name;
 const blogNameError = validateInputs.validateName(req, name);
  if (!blogNameError) {
    models
    .Blog
    .create({
      name: req.body.name,
      BlogCategoryId: req.body.category,
      UserId: req.user.id,
    })
      .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((error) => {
      next(errorFactory.serverError(req));
    });
  } else {
    next(blogNameError);
  }
});

router.post('/:blogId/like', userIdentifier, authRequired, (req, res, next) => {
  let blog = null;
  // Count the number of likes
  models
    .Blog
    .find({
       where: {
         id: req.params.blogId,
       },
     })
    .then((queriedBlog) => {
      let promise = null;

      if (queriedBlog) {
        blog = queriedBlog;

        promise = models.Blog.update({
          count: blog.count + 1,
        }, {
          where: {
            id: blog.id,
          },
        });
      } else {
        throw errorFactory.badRequest(req, 'Blog does not exist');
      }
      return promise;
    })
    .then(() => {
      models
      .BlogCount
      .create({
        BlogId: blog.id,
        UserId: req.user.id,
      });
      res.json(blog);
    })
    .catch(next);
});

router.put('/:blogId', userIdentifier, authRequired, modelEditAuthorizer, (req, res, next) => {
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


router.delete('/:blogId', userIdentifier, authRequired, modelDeleteAuthorizer, (req, res, next) => {
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

router.delete('/:blogId/like', (req, res, next) => {
  // Delete blog count and update count on blog table with ID 'blogId'
  let blog = null;
  models.BlogCount.destroy({
    where: {
      BlogId: req.params.blogId,
    },
  })
  .then((deletedBlogCount) => {
    models
    .Blog
    .find({
      where: {
        id: req.params.blogId,
      },
    })
    .then((selectedBlog) =>{
      let promise = null;
      if (selectedBlog) {
        blog = selectedBlog;
        promise = models.Blog.update({
          count: blog.count - 1,
        }, {
          where: {
            id: blog.id,
          },
        });
      } else {
        throw errorFactory.badRequest(req, 'Blog does not exist');
      }
      return promise;
    })
    .then(() => {
      res.json(blog);
    });
  })
  .catch(next);
});

module.exports = router;
