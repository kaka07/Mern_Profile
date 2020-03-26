const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res,next){
//since it is a middleware function thus it takes three parameters

    //Get token from the header
const token=req.header('x-auth-token');

//Check if there's no token

if(!token){
    return res.status(401).json({msg:'No token ,Authoriztion denied'});
}

//Verify token

try {
    const decoded=jwt.verify(token,config.get('jwtSecret'));
    req.user=decoded.user; 
    next();
} catch (err) {
    res.status(401).json({msg:'Token is not valid'});
}



}