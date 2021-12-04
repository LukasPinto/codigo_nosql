const jwt = require('jsonwebtoken')
const verify = (req,res,next)=>{

    const authHeader= req.headers.authorization;
   
    if(authHeader){
        const token= authHeader.split(" ")[1];
        //console.log(token)
        jwt.verify(token,"admin",(err,user)=>{
            if(err){
                return res.json({error: err})
            }
            req.user=user;
            next()
        })}   
        else{
            res.json({error:"You are no authenticated"})
    }
}

module.exports={verify}