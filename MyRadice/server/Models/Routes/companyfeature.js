const routes = require('express').Router();
const companyfeaturescontroller = require('../Controllers/CompanyFeatures')

routes.get('/company/feature/:id',companyfeaturescontroller.getcompanyfeature);
routes.post('/company/feature/:id',companyfeaturescontroller.addcompanyfeature)


module.exports = routes;