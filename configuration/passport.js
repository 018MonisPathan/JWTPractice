const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');

const jwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const KeyPath = path.join(__dirname, '..', 'rsaPublicKey.pem')
const PUBLIC_KEY = fs.readFileSync(KeyPath,'utf8')

const options = {
   jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
   secretOrKey: PUBLIC_KEY,
   algorithms:['RS256']
}

const strategy = new jwtStrategy(options,(payload,done)=>{

   User.findOne({_id:payload.sub}).then((user)=>{
      if(user){
         return done(null,user)
      }else{
         return done(null,false)
      }
   }).catch((err)=> done(err,false))

})

module.exports = (passport) => {passport.use(strategy);}