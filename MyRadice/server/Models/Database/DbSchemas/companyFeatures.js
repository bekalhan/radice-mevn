const mongoose = require('mongoose');
const {Schema} = mongoose;
const Company = require('./companySchema');


const CompanyFeaturesSchema = new mongoose.Schema({
    featurename :
    {
        type : String,
        unique : true,
        required : true
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


},{collection:"CompanyFeatures",timestamps:true});


module.exports = mongoose.model('CompanyFeatures', CompanyFeaturesSchema);
