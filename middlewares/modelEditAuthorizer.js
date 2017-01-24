const errorFactory = require('../services/errorFactory');

/**
 * Determines if the user is authorized to perform the operation
 * @param  {object} user  The requesting user
 * @param  {object} model The requesting model object
 * @return {Boolean}      TRUE if allowed to continue
 */
const isOperationAuthorized = (user, model) => {
  return model.UserId === user.id;
};

/**
 * The middleware to authorize PUT requests
 * @param  {object}   model     The requesting model object
 * @param  {string}   urlParam  The PUT request URL parameter
 * @param  {object}   req       The request object provided by the Express router
 * @param  {object}   res       The response object provided by the Express router
 * @param  {Function} next      The callback to move the operation forward
 */
const modelEditAuthorizer = (model, urlParam, req, res, next) => {
  const user = req.user;

  model
    .find({
      where: {
        id: req.params[urlParam],
      },
    })
      .then((model) => {
        if (model) {
          if (isOperationAuthorized(user, model)) {
            next();
          } else {
            throw errorFactory.forbidden(req);
          }
        } else {
          throw errorFactory.notFound(req);
        }
      })
      .catch(next);
};

module.exports = modelEditAuthorizer;
