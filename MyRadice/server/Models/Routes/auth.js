const routes = require('express').Router();
const authcontroller = require('../Controllers/AuthController')

routes.post('/register',authcontroller.postregister);
routes.post('/login',authcontroller.postlogin);


module.exports = routes;