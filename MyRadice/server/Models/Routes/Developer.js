const routes = require('express').Router();
const developercontroller = require('../Controllers/DeveloperController');

routes.post('/regdeveloper',developercontroller.regdeveloper);
routes.post('/logdeveloper',developercontroller.logdeveloper);
routes.get('/developer/:id',developercontroller.getdeveloperwithid);



module.exports  = routes;