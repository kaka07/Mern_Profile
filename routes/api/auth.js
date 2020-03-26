const express=require('express');

const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User')
const jwt=require('jsonwebtoken');
const config=require('config');
const {check,validationResult}= require('express-validator/check');
 const bcrypt=require('bcryptjs');


//@route GET api/auth
//@desc Test Route
//@access Public

// router.get('/',auth,(req,res)=>res.send('Auth Route'));



router.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});



//@route POST api/auth
//@desc Authenticate User and get token
//@access Public
 
router.post('/',[
   
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],async(req,res)=>{
    //console.log(req.body)//object of body that is going to be sent in order to make req.body work we have to aplly middleware
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

//As we dont want to use req.body again and again thus we have to pull out few things from req.body
const {email,password}=req.body; 

try {
    //See if user exits 

    let user=await User.findOne({email});

    if(!user){
       return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({
            errors:[{msg:'Invalid Credentials'}]
        })
    }






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