const routes = require('express').Router();
const featurecontroller = require('../Controllers/FeaturesController');

routes.post('/developer/features',featurecontroller.addfeatures);
routes.get('/developer/features/:id',featurecontroller.getfeatures);
routes.patch('/developer/configure/patchinfo/:id',featurecontroller.patchbio);
routes.patch('/developer/configure/patchfeature/:id',featurecontroller.patchfeature);
routes.post('/developer/configure/addfeature/:id',featurecontroller.newfeature);
routes.delete('/developer/configure/deletefeature/:id',featurecontroller.delfeature);
routes.post('/developer/configure/addgithub/:id',featurecontroller.addgithub);
routes.post('/developer/configure/addlinkedln/:id',featurecontroller.addlinkedln);
routes.post('/developer/configure/addtwitter/:id',featurecontroller.addtwitter);




module.exports = routes;