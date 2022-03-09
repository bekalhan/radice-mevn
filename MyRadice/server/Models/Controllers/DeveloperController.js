const Developer = require('../Database/DbSchemas/developerSchema');
const User = require('../Database/DbSchemas/userSchema');
const ErrorResponse = require('../Helpers/errorResponse');
const errorresponse = require('../Helpers/errorResponse');


exports.regdeveloper = async (req,res,next)=>
{
    const {email,password,secretkey} = req.body;
    try
    {
        const user = await User.findOne({email}).select("+password");

        if(!user)
        {
            return next(new errorresponse("Girdiğiniz bilgilere ait kullanıcı bulunamadı"),401);
        }

        const name = user.name;
        const secret_key = req.body.secret_key;
        const developer = await Developer.create({name,email,password,secret_key});

        if(!developer)
        {
            return next(new errorresponse("maalesef",401));
        }
        user.isDeveloper = true;
        user.save();
        developermessage(201,res);
    }catch(err)
    {
        console.log(err);
    }
}


exports.logdeveloper = async (req,res,next)=>
{
    const {email,password,secret_key} = req.body;

    if(!email || !password)
    {
        return next(new errorresponse("Lütfen email ve şifrenizin geçerli olduğundan emin olunuz",400));
    }

    try
    {
        const developer = await Developer.findOne({email}).select("+password");

        if(!developer)
        {
            return next(new errorresponse("Girdiğiniz bilgilere ait kullanıcı bulunamadı"),401);
        }

 

        if(developer.secret_key!==secret_key)
        {
            return next(new errorresponse("Gridiğiniz bilgilere ait kullanıcı bulunamadı"));
        }

        sendtoken(developer,200,res);
    }catch(e)
    {
        console.log(e);
    }
}

exports.getdeveloperwithid = async (req,res,next)=>
{
    const find_developer = await Developer.findOne({_id:req.params.id});
    res.send(find_developer);
}


const developermessage = (statusCode,res)=>
{
    res.status(statusCode).json({success : true});
}

const sendtoken = (developer,statusCode,res)=>
{
    const token = developer.getSignedToken();
    res.status(statusCode).json({success : true,token,developer});
}
