const CompanyWorks = require('../Database/DbSchemas/companyWorks');
const Company = require('../Database/DbSchemas/companySchema');
const Developer = require('../Database/DbSchemas/developerSchema');
const errorresponse = require('../Helpers/errorResponse');


exports.addcompanywork = async (req,res,next)=>
{
  
    const {customer_name,accept_date,delivery_date,project_defination,price} = req.body;
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        const companyid = find_developer.companies.toString();
        const company = companyid;

        const companywork = await CompanyWorks.create({customer_name,accept_date,delivery_date,project_defination,price,company});

        if(!companywork)
        {
            return next(new errorresponse("Maalesef şirket oluşturamadı",401));
        }


        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        find_company.company_works.push(companywork);
        await find_company.save();


    }catch(e)
    {
        console.log(e)
    }
}

exports.getworks = async (req,res,next)=>
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

        const list = find_company.company_works;

        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await CompanyWorks.findById(list[i]);
        }
        res.send(vendorDetails);

    }catch(e)
    {
        console.log(e);
    }
}