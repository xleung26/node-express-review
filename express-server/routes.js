const router = require('express').Router()
const controllers = require('./controllers.js');

router
  .route('/todoList')
  .get(controllers.get)
  .post(controllers.post)
  .delete(controllers.delete)

module.exports = router;