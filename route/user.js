const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
const userModel=require('../model/Schema/user')
const checkEmail=require('../middleware/checkEMail')
router.post('/register',checkEmail,async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({message:"Please filled all details"});
        }
        const encryptPassword=bcrypt.hashSync(password,10);
        const userdata=new userModel({
        name,
        email,
        password:encryptPassword
    })
    const user=await userdata.save();
    res.status(201).json({message:"user registered SuccessFully",success:true,data:{userId:user._id,name:user.name,email:user.email}})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Some error occured",success:false,error:err})
        
    }
})


router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({message:"Please filled all details"})
        }

        const user= await userModel.findOne({email:email})
        if(!user){
    res.status(400).json({message:"user not found"})
        }
        else{
            const isMatched=await bcrypt.compareSync(password,user.password)
            if(!isMatched){
                res.status(200).json({message:"Invalid credentials"})
            }
            else{
                const token=await user.generateToken();
                console.log(token)
                res.cookie('jwttoken',token,{
                    expires:new Date(Date.now()+ 86400000)  
                })
                res.status(200).json({message:"User Login Successfully",success:true,userid:user._id})
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something error occured in Login"})
    }
 
})
module.exports=router;