const jwt =require('jsonwebtoken')
require('dotenv').config()

const verifyJWT=(req,res,next)=>{
    const authHeader=req.authHeaders['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);// bear token 
    const token = authHeader.split('')[1];
    jwt.verify(
        token,
        process.env.ACESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403);//forbiden
            req.user=decoded.username; 
            next();

        }
    )

}
module.exports = verifyJWT