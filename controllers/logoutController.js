const userDB={
    users: require('../model/users.json'),
    setUsers: function(data) 
    {
        this.users =data
    }
}
const fsPromises=require('fs').promises;
//on clint  also delete the access token


const jwt =require('jsonwebtoken')
require('dotenv').config()

const path = require('path')
const { decode } = require('punycode')
const handlelogout = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt)return res.sendStatus(204);
    console.log(cookies.jwt)
    const refreshToken=cookies.jwt

    const foundUser =userDB.users.find(person=> person.username=== refreshToken) ;
   if(!foundUser)
   { res.clearCookies('jwt',{httpOnly:true})

     return res.sendStatus(401)  
    }//unaurt  horized}

 const otherUsers=userDB.users.filter(person=>person.refreshToken !==foundUser.refreshToken);
 const currentUser={...foundUser,refreshToken:''

};
userDB.setUsers([...otherUsers ,currentUser]);

 await  fsPromises.writeFile(
    path.join(__dirname,'..','model',users.json),
    JSON.stringify(userDB,users)

);


res.clearCookies('jwt', {httpOnly:true}   );
res.sendStatus(204)
;
}
module.exports={handlelogout}
