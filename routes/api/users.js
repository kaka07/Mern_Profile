const express=require('express');

const router=express.Router();
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken')
const {check,validationResult}=require('express-validator/check')
const config=require('config');
const bcrypt=require('bcryptjs');
const User=require('../../models/User');

//@route POST api/users
//@desc Register User
//@access Public
 
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please Enter a password with 6 or more characters').isLength({min:6})
],async(req,res)=>{
    //console.log(req.body)//object of body that is going to be sent in order to make req.body work we have to aplly middleware
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

//As we dont want to use req.body again and again thus we have to pull out few things from req.body
const {name,email,password}=req.body; 

try {
    //See if user exits 

    let user=await User.findOne({email});

    if(user){
        res.status(400).json({errors:[{msg:'User already exists'}]});
    }

//Get users gravatar
const avatar=gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
});

//Create an instance of the user

user=new User({
    name,
    email,
    avatar,
    password
})
//Encrypt the password using bcrypt
 //create a salt to do hashing

 const salt= await bcrypt.genSalt(10);
user.password=await bcrypt.hash(password,salt);
await user.save();

//Return jsonwebtoken
//make an object named payload
const payload={
    user:{
        id:user.id
    }
}

jwt.sign(payload,config.get('jwtSecret'),
{expiresIn:360000},
(err,token)=>{//callback function
    if(err) throw err;
    res.json({token})
}
    );




} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}



}
);



module.exports=router;