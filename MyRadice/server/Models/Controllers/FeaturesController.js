const Features = require('../Database/DbSchemas/featuresSchema')
const Developer = require('../Database/DbSchemas/developerSchema')
const errorresponse = require('../Helpers/errorResponse');


exports.addfeatures = async (req,res,next)=>
{
    const {featurename,featurerate,developer} = req.body; 
    try
    {
        const feature = await Features.create({featurename,featurerate,developer})
        const find_developer = await Developer.findOne({_id : developer});
        if(!find_developer)
        {
            return next(new errorresponse("Bu developer bulunamadı",401));
        }
        find_developer.myfeatures.push(feature);
        await find_developer.save();
    }catch(err)
   
    {
        console.log(err);
    }
}


exports.getfeatures = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findById(req.params.id);
        const list =   find_developer.myfeatures;
        const vendorDetails = [];
        for(let i =0;i<=list.length-1;i++)
        {
            vendorDetails[i] = await Features.findById(list[i]);
        }
        res.send(vendorDetails);
    }catch(e)
    {
        console.log(e);
    }
}


exports.patchbio = async (req,res,next)=>
{

    try
    {
        
        const find_developer = await Developer.findOne({_id:req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef bu bilgilere ait developer bulunamadı",401));
        }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("Maalesef girdiğiniz özel kelime developer ile eşleşemedi",401));
        }

         find_developer.information = req.body.information;
         find_developer.save();
         featuresmessage(200,res);
    }catch(err)
    {
        featuresmessage(400,err);
    }
}


exports.patchfeature = async (req,res,next)=>
{
    try
    {
       const find_developer = await Developer.findOne({_id:req.params.id});

       if(!find_developer)
       {
           return next(new errorresponse("maalesef developer bulunamadı",401));
       }

       if(find_developer.secret_key !== req.body.secret_key)
       {
           return next(new errorresponse("maalesef özel kelimeler uyuşmuyo",401));
       }


       const find_feature = await Features.findOne({featurename :  req.body.featurename});

       if(!find_feature)
       {
           return next(new errorresponse("Maalesef bu özellik bulunamadı",401));
       }
       find_feature.featurename = req.body.newfeaturename;
       find_feature.featurerate = req.body.featurerate;
       find_feature.save();
       featuresmessage(200,res);
    }catch(err)
    {
        console.log(err);
    }
}

exports.newfeature = async (req,res,next)=>
{
    try
    {
        const find_developer = await Developer.findOne({_id : req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("Maalesef developer bulunamadı",401));
        }

        if(find_developer.secret_key!==req.body.secret_key)
        {
            return next(new errorresponse("Maalesef özel kelime uyuşmadı",401));
        }
        const featurename = req.body.featurename;
        const find_featurename  = await Features.findOne({featurename : featurename});

        if(find_featurename)
        {
            return next(new errorresponse("Böyle bir özellik zaten mevcut",401));
        }

        const featurerate = req.body.featurerate;
        const developer = req.params.id;
        const new_features = await Features.create({featurename,featurerate,developer});

        find_developer.myfeatures.push(new_features);
        find_developer.save();
        featuresmessage(200,res);
    }catch(err)
    {
        console.log(err);
    }
}

exports.delfeature = async (req,res,next)=>
{
    try{
    
        const find_developer = await Developer.findOne({_id : req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("maalese developer buunamadı",401));
        }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("maalesef özel kelimeler eşleşemedi",401));
        }

         await Features.findOneAndRemove({featurename : req.body.featurename});
        


    }catch(err)
    {
        console.log(err);
    }
}


exports.addgithub = async (req,res,next)=>
{
    try{
        const find_developer = await Developer.findOne({_id : req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("maalese developer buunamadı",401));
        }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("maalesef özel kelimeler eşleşemedi",401));
        }
        
        if(find_developer.github === req.body.github)
        {
            return next(new errorresponse("Aynı github adresleri girilmemeli"),401);
        }

        find_developer.github = req.body.github;
        find_developer.save();
        featuresmessage(200,res);
    }catch(err)
    {
        console.log(err);
    }
}


exports.addlinkedln = async (req,res,next)=>
{
    try{
        const find_developer = await Developer.findOne({_id : req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("maalese developer buunamadı",401));
        }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("maalesef özel kelimeler eşleşemedi",401));
        }
        
        if(find_developer.linkedln === req.body.linkedln)
        {
            return next(new errorresponse("Zaten bu linkedln hesabını kullanmaktasınız",401));
        }
        find_developer.linkedln = req.body.linkedln;
        find_developer.save();
        featuresmessage(200,res);
    }catch(err)
    {
        console.log(err);
    }
}

exports.addtwitter = async (req,res,next)=>
{
    try{
        const find_developer = await Developer.findOne({_id : req.params.id});

        if(!find_developer)
        {
            return next(new errorresponse("maalese developer buunamadı",401));
        }

        if(find_developer.secret_key !== req.body.secret_key)
        {
            return next(new errorresponse("maalesef özel kelimeler eşleşemedi",401));
        }

        if(find_developer.twitter === req.body.twitter)
        {
            return next(new errorresponse("Zaten bu twitter hesabını kullanmaktasınız",401));
        }
        
        find_developer.twitter = req.body.twitter;
        find_developer.save();
        featuresmessage(200,res);
    }catch(err)
    {
        console.log(err);
    }
}

const featuresmessage = (statusCode,res)=>
{
    res.status(statusCode).json({success : true});
}