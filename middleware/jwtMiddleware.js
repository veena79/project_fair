//middleware is used to verify jsonweb token
const jwt=require('jsonwebtoken')
const jwtmiddleware=(req,res,next)=>{
    //logic
    console.log('inside jwt');
    const token=req.headers["authorization"].split(' ')[1]
   /*   console.log(token);  */
    //verify
    try{
const jwtResponse=jwt.verify(token,'supersecretkey')
console.log(jwtResponse);
req.payload=jwtResponse.userid
next()
    }catch(error){
        res.status(401).json('authorization failed...please login',error)
    }
   

}
module.exports=jwtmiddleware