const Company = require('../Database/DbSchemas/companySchema');
const errorresponse = require('../Helpers/errorResponse');
const Developer = require('../Database/DbSchemas/developerSchema')
const Application = require('../Database/DbSchemas/applicationsSchema');
const User = require('../Database/DbSchemas/userSchema')
const Offer = require('../Database/DbSchemas/offerSchema');
const { off } = require('../Database/DbSchemas/userSchema');

exports.addcompany = async (req,res,next)=>
{
    const {email,password,secret_key,company_name,developer} = req.body;
    try
    {
        const find_developer = await Developer.findOne({email : req.body.email}).select("+password");

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef bu bilgilere ait developr bulunmamadı",401));
        }

        const founder = find_developer.name;
        // const isMatch = await find_developer.matchPassword(password);

        // if(!isMatch)
        // {
        //     return next(new errorresponse("Maalesef bu şifreye ait kullanıcı bulunmadı",401));
        // }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next("Maalesef özel kelimeler eşleşemedi",401);
        }

        if(find_developer.isBoss === true)
        {
            return next(new errorresponse("Zaten bir startupa sahipsiniz",401));
        }

        find_developer.isBoss =true;
        find_developer.save();
        const company = await Company.create({founder,email,password,secret_key,company_name,developer});

        if(!company)
        {
            return next(new errorresponse("Maalesef startup oluşturalamadı",401));
        }
        find_developer.companies.push(company);
        await find_developer.save();
        sendinfo(find_developer,200,res);
    }catch(err)
    {
        console.log(err)
    }
}

exports.control = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Developer bulunamadı",401));
        }
        sendinfo(find_developer,200,res);
        
    }catch(e)
    {
        console.log(e);
    }
}

exports.getcompany = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);


        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        const id = find_developer.companies.toString()

        const company = await Company.findById(id);

        if(!company)
        {
            return next(new errorresponse("Maalesef startup bulunamadı",401));
        }
        res.send(company);

    }catch(e)
    {
        console.log(e);
    }
}

exports.getapp = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Developer bulunamadı",401));
        }

        const company_id = find_developer.companies.toString();
        
        const find_company = await Company.findById(company_id);

        if(!find_company)
        {
            return next(new errorresponse("Bu şirket bulunamadı",401));
        }

        const list =   find_company.company_applications;
        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await Application.findById(list[i]);
        }
        res.send(vendorDetails);
    }catch(e)
    {
        console.log(e);
    }
}

exports.offerdeveloper = async (req,res,next)=>
{
    const {cv,developer} = req.body;
    try{
        const find_company = await Company.findOne({company_name : req.params.company_name});

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket buunamadı",401));
        }

  
        const company = find_company;
        const find_developer  = await  Developer.findById(developer);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef bu developer bulunamadı",401));
        }


        
        if(find_developer.isBoss)
        {
            return next(new errorresponse("Zaten bir şirket sahibisiniz",401));
        }

        // kontrol
        const developer_app = find_developer.applications;

        if(find_developer.isEmployee)
        {
            return next(new errorresponse("Zaten bir şirkette çalışmaktasınız",401));
        }
        if(developer_app.length>=1)
        {
            return next(new errorresponse("Daha fazla başvuru yapamazsınız",401));
        }
        
        // kontrol2

        const company_app = find_company.company_applications;

        if(company_app.length > 8)
        {
            return next(new errorresponse("Bu şirkete yeterince başvuru var",401));
        }

        const application = await Application.create({cv,developer,company}); 

        if(!application)
        {
            return next(new errorresponse("Maalesef başvuru alınamadı",401));
        }

        find_company.company_applications.push(application);
        find_developer.applications.push(application);
        find_company.save();
        find_developer.save();  
    }catch(e)
    {
        console.log(e);
    }
}

exports.offerjob = async (req,res,next)=>
{
    const {job_defination,price,user} = req.body;
    try
    {
        const find_company = await Company.findOne({company_name : req.params.company_name});

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        const company = find_company;
        const find_user = await User.findById(user);

        if(!find_user)
        {
            return next(new errorresponse("Maalesef kullancı bulunamadı",401));
        }

        if(find_user.isDeveloper)
        {
            return next(new errorresponse("Zaten geliştiricisiniz",401));
        }

        const user_offer = find_user.user_offer;
        
        if(user_offer.length >= 1)
        {
            return next(new errorresponse("Daha fazla tekli veremezsiniz",401));
        }

        const company_offer = find_company.company_works;

        if(company_offer>10)
        {
            return next(new errorresponse("Daha fazla iş alamazsınız",401))
        }


        const offer = await Offer.create({job_defination,price,user,company});

        if(!offer)
        {
            return next(new errorresponse("Maalesef iş teklifi oluşturalamadı",401));
        }



        find_company.company_works.push(offer);
        find_user.user_offer.push(offer);
        find_company.save();
        find_user.save();
    }catch(e)
    {
        console.log(e);
    }
}

exports.getjob = async (req,res,next)=>
{
    console.log("get job");
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef kullanıcı bulunamadı",401));
        }

        const company_id = find_developer.companies.toString();

        const find_company = await Company.findById(company_id);

        if(!find_company)
        {
            return next(new errorresponse("Aradığınız şirket bulunamadı",401));
        }

        const list =   find_company.company_works;
        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await Offer.findById(list[i]);
        }
        console.log(vendorDetails);
        res.send(vendorDetails);
        
    }catch(e)
    {
        console.log(e);
    }
}

exports.acceptdeveloper = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findOne({email : req.params.email});

        if(!find_developer)
        {
            return next(new errorresponse("Developer bulunamadı",401));
        }

        const founder = await Developer.findById(req.params.id);

        if(!founder)
        {
            return next(new errorresponse("Şirket bulunamadı",401));
        }

        if(founder.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("Özel kelimeler uyuşmuyor",401));
        }

        const companyid = founder.companies.toString();

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Şirket bulunamadı",401));
        }

        if(find_company.members.length>3)
        {
            return next(new errorresponse("Bu şirket max sayıda developer çalışıyor",401));
        }

        if(find_developer.myworkplace.length>1)
        {
            return next(new errorresponse("Zaten bir şirkete üyesiniz"));
        }
        find_developer.myworkplace.push(find_company);

        if(find_company.members.includes(find_developer._id))
        {
            return next(new errorresponse("Bu developer zaten şirkette"));
        }
        find_company.members.push(find_developer);
        find_developer.isEmployee = true;

        const delete_request = await Application.findOne({developer : find_developer,company : find_company});


        if(find_developer.applications.includes(delete_request._id)){
            const index = find_developer.applications.indexOf(delete_request._id);
            find_developer.applications.splice(index,1);
            await find_developer.save();
        }

        if(find_company.company_applications.includes(delete_request._id))
        {
            const index = find_company.company_applications.indexOf(delete_request._id);
            find_company.company_applications.splice(index,1);
            await find_company.save();
        }

        find_developer.save();
        find_company.save();
        companymessage(200,res);

    }catch(e)
    {
        console.log(e);
    }
}

exports.refusedeveloper = async (req,res,next)=>
{
    
    try{    
    
        const find_developer = await Developer.findOne({email : req.params.email});

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        const application = find_developer.applications.toString();

        if(!application)
        {
            return next(new errorresponse("Böyle bir başvuru yoktur",401));
        }

        const founder = await Developer.findById(req.params.id);
        
        if(!founder)
        {
            return next(new errorresponse("Maalesef founder bulunamadı",401));
        }

        if(founder.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("Maalesef özel kelimeler uyuşmadı",401));
        }

        const companyid = founder.companies.toString();

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        find_developer.applications.remove({_id : application});
        find_company.company_applications.remove({_id : application});
        find_developer.save();
        find_company.save();
        companymessage(200,res);

    }catch(e)
    {
        console.log(e);
    }
}

exports.acceptjob = async (req,res,next)=>
{
    try
    {
        const find_user = await User.findOne({email : req.params.email});

        if(!find_user)
        {
            return next(new errorresponse("Maalesef kullanıcı bulunamadı",401));
        }

        const founder = await Developer.findById(req.params.id);

        if(!founder)
        {
            return next(new errorresponse("Maalesef founder bulunamadı",401));
        }

        if(founder.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("Maalesef özel kelimeler eşleşmiyor",401));
        }

        const companyid = founder.companies.toString();

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        if(find_company.company_activeworks.length >10)
        {
            return next(new errorresponse("Aktif yapılan işlerin sayısı 10 dan fazla olamaz",401));
        }

        const find_offer_id = find_user.user_offer.toString();
        const find_user_offer = await Offer.findById(find_offer_id);
        find_user.accepted_offers.push(find_user_offer);
        find_company.company_activeworks.push(find_user_offer);


        if(find_user.user_offer.includes(find_offer_id))
        {
            const index = find_user.user_offer.indexOf(find_offer_id);
            find_user.user_offer.splice(index,1);
            find_user.save();
        }

        if(find_company.company_works.includes(find_offer_id))
        {
            const index = find_company.company_works.indexOf(find_offer_id);
            find_company.company_works.splice(index,1);
            find_company.save();
        }

        companymessage(200,res);
        
    }catch(e)
    {
        console.log(e);
    }
}

exports.refusejob = async (req,res,next)=>
{
    try{
        const find_user = await User.findOne({email : req.params.email});

        if(!find_user)
        {
            return next(new errorresponse("Maalesef user bulunamadı",401));
        }

        const offer = find_user.user_offer.toString();

        if(!offer)
        {
            return next(new errorresponse("Maalesef teklif bulunamadı",401));
        }

        const founder = await Developer.findById(req.params.id);

        if(!founder)
        {
            return next(new errorresponse("Maalesef founder bulunamadı",401));
        }

        if(founder.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("maalesef özel kelimeler eşleşemedi",401));
        }

        const companyid = founder.companies.toString();

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        find_user.user_offer.remove({_id : offer});
        find_company.company_works.remove({_id:offer});
        find_user.save();
        find_company.save();
        companymessage(200,res);

    }catch(e)
    {
        console.log(e);
    }
}

exports.activeworks = async (req,res,next) =>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        const companyid = find_developer.companies.toString();

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef şirket bulunamadı",401));
        }

        const list = find_company.company_activeworks;
        const vendorDetails = [];
        for(let i=0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await Offer.findById(list[i]);
        }

        res.send(vendorDetails);
    }catch(e)
    {
        console.log(e);
    }
}

exports.getcv = async (req,res,next)=>
{
    try{

    const find_application = await Application.findById(req.params.id);

    res.send(find_application.cv)
    }catch(e)
    {
        console.log(e);
    }
}

exports.getdef = async (req,res,next)=>
{
    try{
        const find_offer = await Offer.findById(req.params.id);
        res.send(find_offer.job_defination);
    }catch(e)
    {
        console.log(e);
    }
}

exports.getdevelopers = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        const companyid = find_developer.companies.toString();

        if(!companyid)
        {
            return next(new errorresponse("Maalesef company ulaşamdı"));
        }

        const find_company = await Company.findById(companyid);

        if(!find_company)
        {
            return next(new errorresponse("Maalesef company bulunamdı",401));
        }

        const list =   find_company.members;
        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await Developer.findById(list[i]);
        }
        res.send(vendorDetails);

    }catch(e)
    {
        console.log(e);
    }
}

const companymessage = (statusCode,res)=>
{
    console.log("company message içi")
    res.status(statusCode).json({success : true});
}

const sendinfo = (developer,statusCode,res)=>
{
    const isBoss = developer.isBoss;
    console.log("isboss "+isBoss);
    res.status(statusCode).json({success : true,isBoss,developer});
}
