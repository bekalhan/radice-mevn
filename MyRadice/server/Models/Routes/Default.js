const routes = require('express').Router();
const defaultcontroller = require('../Controllers/DefaultController');

routes.get('/',defaultcontroller.getdefaultpage);


module.exports = routes;