require("dotenv").config({path:"./config.env"});
const { urlencoded } = require('express');
const express =  require('express');
const bodyParser = require('body-parser');
const errorhandler = require('./Models/MiddleWare/Error')


const cors = require('cors')
const app = express();

// import the database
require('./Models/Database/MongoDb')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const routesauth = require('./Models/Routes/auth');
const routeshome = require('./Models/Routes/Home');
const routesdeveloper = require('./Models/Routes/Developer')
const routesfeature = require('./Models/Routes/Features');
const routescompany = require('./Models/Routes/Company')
const routescompanyfeature = require('./Models/Routes/companyfeature');
const companywork = require('./Models/Routes/companyworks')

app.listen(5000,()=>
{
    console.log("server has been worked on port 5000");
});


app.use('/',routesauth);
app.use('/',routeshome);
app.use('/',routesdeveloper);
app.use('/',routesfeature);
app.use('/',routescompany);
app.use('/',routescompanyfeature);
app.use('/',companywork);
app.use(errorhandler);


