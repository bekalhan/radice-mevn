const routes = require('express').Router();
const companycontroller = require('../Controllers/CompanyController');

routes.post('/company',companycontroller.addcompany);
routes.get('/company/control/:id',companycontroller.control);
routes.get('/company/:id',companycontroller.getcompany);
routes.get('/company/appointments/:id',companycontroller.getapp);
routes.get('/company/offers/:id',companycontroller.getjob);
routes.post('/company/appointments/:company_name',companycontroller.offerdeveloper); // şirkette developer olarak çalışmak için
routes.post('/company/offers/:company_name',companycontroller.offerjob);
routes.post('/company/developer/:id/:email',companycontroller.acceptdeveloper);
routes.post('/company/refusedeveloper/:id/:email',companycontroller.refusedeveloper);
routes.post('/company/offer/:id/:email',companycontroller.acceptjob);
routes.post('/company/refusejob/:id/:email',companycontroller.refusejob);
routes.get('/company/developers/:id',companycontroller.getdevelopers);
routes.get('/company/activeworks/:id',companycontroller.activeworks);
routes.get('/company/getcv/:id',companycontroller.getcv);
routes.get('/company/getdef/:id',companycontroller.getdef);


module.exports = routes;