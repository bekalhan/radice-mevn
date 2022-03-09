const User = require('../Database/DbSchemas/userSchema');
const axios = require('axios');
const errorresponse = require('../Helpers/errorResponse');
const { protect } = require('../MiddleWare/auth');


exports.postregister = async (req,res,next)=>
{
    const {name,email,password} = req.body;
    try
    {
       const user = await  User.create({name,email,password});
      sendtoken(user,201,res);
    }catch(err)
    {
        res.send({hata : "Maalesef hatalı bir işlem yaptınız"});
    }
}

exports.postlogin = async (req,res,next)=>
{
    const {email,password} = req.body;


    if(!email || !password)
    {
        return next(new errorresponse("Lütfen email ve şifrenizin geçerli olduğundan emin olunuz",400));
    }
    try
    {
        const user = await User.findOne({email}).select("+password");
        if(!user)
        {
            return next(new errorresponse("Girdiğiniz bilgilere ait kullanıcı bulunamadı",401));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch)
        {
            return next(new errorresponse("Girdiğiniz bilgilere ait kullanıcı bulunamadı",401));
        }

       sendtoken(user,200,res);
    }catch(e)
    {
        res.send({hata : "Maalesef hatalı bir işlem yaptınız"});

    }
}


const sendtoken = (user,statusCode,res)=>
{
    const token = user.getSignedToken();
    res.status(statusCode).json({success : true,token,user});
}

