const CompanyFeatures = require('../Database/DbSchemas/companyFeatures');
const Company = require('../Database/DbSchemas/companySchema');
const Developer = require('../Database/DbSchemas/developerSchema');
const errorresponse = require('../Helpers/errorResponse');


exports.getcompanyfeature = async (req,res,next)=>
{
   
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("maalesef developer bulunamadı",401));
        }

        const companyid = find_developer.companies.toString();
        const find_company = await Company.findById(companyid);

        const list = find_company.company_features;

        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await CompanyFeatures.findById(list[i]);
        }
        res.send(vendorDetails);

    }catch(e)
    {
        console.log(e);
    }
}

exports.addcompanyfeature = async (req,res,next)=>
{
    const {featurename,secret_key} = req.body;
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        if(find_developer.secret_key!==req.body.secret_key)
        {
            return next(new errorresponse("Özel kelimeler eşleşmedi",401));
        }

        const companyid = find_developer.companies.toString();
        const company = companyid;

        const companyfeature = await CompanyFeatures.create({featurename,company});

        if(!companyfeature)
        {
            return next(new errorresponse("Maalesef şirket oluşturamadı",401));
        }


        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        find_company.company_features.push(companyfeature);
        await find_company.save();
        companymessage(200,res);

    }catch(e)
    {
        console.log(e);
    }
}


const companymessage = (statusCode,res)=>
{
    res.status(statusCode).json({success : true});
}
