const jwt = require('jsonwebtoken');
const User = require('../Database/DbSchemas/userSchema');
const errorresponse = require('../Helpers/errorResponse');

exports.protect = async (req,res,next) => 
{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        // Bearer 123h1jk24h1221
        token = req.headers.authorization.split(" ")[1];
        console.log("token" + token);
    }

    if(!token)
    {
        return next(new errorresponse("Bu sayfaya erişiminiz bulunmamaktadır",401));
    }

    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("protect secret "+process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        console.log(user);

        if(!user)
        {
            return next(new errorresponse("Bu id'ye sahip kullanıcı bulunamadı",404));
        }

        req.user = user;

        next();
    }catch(e)
    {
        return next(new errorresponse("Bu sayfaya erişiminiz bulunmamaktadır",401));
    }
}
