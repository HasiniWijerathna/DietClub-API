'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const authRequired = require('../middlewares/authRequired');
const userIdentifier = require('../middlewares/userIdentifier');

/* GET all categories listing. */
router.get('/', (req, res) => {
  models
  .BlogCategory
  .findAll({
    attributes: ['id', 'name'],
    include: [models.Blog],
    order: [
      ['name', 'ASC'],
    ],
  })
    .then((allCategories) => {
      console.log(allCategories);
      res.json({
        results: allCategories,
      });
    });
});

router.get('/:categoryId', (req, res, next) => {
  // Return category with ID 'categoryId'
  models
  .BlogCategory
  .find({
     where: {
       id: req.params.categoryId,
     },
     include: [models.Blog],
   })
  .then((existingCategory) => {
    let promise = null;

    if(existingCategory) {
      promise = res.json(existingCategory);
    } else {
      throw errorFactory.notFound(req, 'Category does not exist');
    }
    return promise;
  })
  .catch(next);
});

router.post('/', userIdentifier, authRequired, (req, res, next) => {
  // Create new category
 const name = req.body.name;
 const categoryError = validateInputs.validateName(req, name);
  if (!categoryError) {
    models
    .BlogCategory
    .create({
      name: req.body.name,
      action: req.body.action,
    })
      .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((error) => {
      next(errorFactory.serverError(req));
    });
  } else {
    next(categoryError);
  }
});

router.put('/:categoryId', userIdentifier, authRequired, (req, res, next) => {
  // Update categoty with ID 'categoryId'
  models
  .BlogCategory
  .find({
    where: {
      id: req.params.categoryId,
    },
  })
  .then((categoty) => {
    let promise = null;
    const name = req.body.name;
    const categoryError = validateInputs.validateName(req, name);

    if (categoty && !categoryError) {
      promise = categoty.updateAttributes({
        name: req.body.name,
      });
    } else if (categoryError) {
      next(categoryError);
    } else {
      throw errorFactory.badRequest(req, 'Category does not exist');
    }

    return promise;
  })
  .then((updatedCategory) => {
    res.send(updatedCategory);
  })
  .catch(next);
});

router.delete('/:categoryId', userIdentifier, authRequired, (req, res, next) => {
  // Delete category with ID 'categoryId'
  models.BlogCategory.destroy({
    where: {
      id: req.params.categoryId,
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  });
});

module.exports = router;
