const routes = require('express').Router();
const homecontroller = require('../Controllers/HomeController');
const {protect} = require('../MiddleWare/auth');

routes.get('/home',protect,homecontroller.home);


module.exports = routes;
