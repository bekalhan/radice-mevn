const routes = require('express').Router();
const companyworkcontroller = require('../Controllers/CompanyWorks')

routes.post('/company/work/:id',companyworkcontroller.addcompanywork);
routes.get('/company/work/:id',companyworkcontroller.getworks);

module.exports = routes;