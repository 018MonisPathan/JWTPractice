const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname , 'rsaPrivateKey.pem')
const PRIVATE_KEY = fs.readFileSync(keyPath,'utf8')

function IssueJW_Token(user){
   const id = user._id 
   const expires = '1d'
   const payload = {
      sub:id,
      iat:Date.now()
   }

   const Token = jsonwebtoken.sign(payload,PRIVATE_KEY,{algorithm:'RS256',expiresIn:expires})

   
      return {
         token: "Bearer " + Token,
         expires: expires
       }
   

}

module.exports.IssueJW_Token = IssueJW_Token