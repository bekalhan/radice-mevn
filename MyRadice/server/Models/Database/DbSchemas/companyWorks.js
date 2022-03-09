const mongoose = require('mongoose');
const {Schema} = mongoose;
const Company = require('./companySchema');


const CompanyWorks = new mongoose.Schema({
    customer_name :
    {
        type : String,
        required : true
    },
    accept_date:
    {
        type : String,
        required : true
    },
    delivery_date :
    {
        type : String,
        required : true
    },
    project_defination :
    {
        type : String,
        required : true
    },
    price :
    {
        type : String,
        require : true
    },
    company :
    [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Company',
            required : true,
            autopopulate : true
        }
    ]


},{collection:"CompanyWorks",timestamps:true});


module.exports = mongoose.model('CompanyWorks', CompanyWorks);