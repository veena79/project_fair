//register
const users = require("../modal/userModel");

const jwt=require('jsonwebtoken')
exports.registerController=async(req,res)=>{
    const {username,email,password}=req.body
    
try{
const existingUser=await users.findOne({email})
if(existingUser){
    res.status(406).json('acount already exist')
}
else{
    const newUser=new users({
        username,
        
        email,
        password,
        github:"",
        linkedin:"",
        profile:""
    })
    //save()-store the data in mongodb
    await newUser.save()
    res.status(200).json(newUser)
}
}catch(error){
    res.status(401).json(`registration failed due to ${error}`)
}
}
//login
exports.loginController=async(req,res)=>{
    const {email,password}=req.body
    try{

    

const existingUser=await users.findOne({email,password})
if(existingUser){
    const token=jwt.sign({userid:existingUser._id},'supersecretkey')
    res.status(200).json({existingUser,token})
}else{
    res.status(406).json('invalid email or password')
}
}catch(error){
    res.status(401).json(error)
}
}
exports.editProfileController=async(req,res)=>{
    const userid=req.payload
    const {username,email,password,github,linkedin,profile}=req.body
    const profileImage=req.file?req.file.filename:profile
    try {
        const userProfile=await users.findByIdAndUpdate({_id:userid},{username,email,password,github,linkedin,profile:profileImage},{new:true})
        await userProfile.save()
        res.status(200).json(userProfile)
    } catch (error) {
        res.status(401).json(error)
    }
}

