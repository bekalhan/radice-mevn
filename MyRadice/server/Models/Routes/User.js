const routes = require('express').Router();
const personcontroller = require('../Controllers/PersonController')

routes.get('/user',personcontroller.getuser);
routes.get('/user/:id',personcontroller.userpage);
routes.post('/user',personcontroller.postuser);


module.exports = routes;