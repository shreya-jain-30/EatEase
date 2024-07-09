const LocalStrategy= require('passport-local').Strategy
const User=require('../models/user');
const bcrypt= require('bcrypt');
function init(passport){
    console.log('hiii')
    passport.use(new LocalStrategy({usernameField:'email',passwordField:'pswd'},async(email,pswd,done)=>{
        console.log(email);
        console.log('hii............');
        try{
            const user= await User.findOne({email:email});
            console.log(user._id);
            if(!user)
            {
                return done(null,false,{message: 'No user with this email'})
            }
            const match=await bcrypt.compare(pswd,user.pswd);
            if(match)
            {
                return done(null,user,{message:'Logged in successfully'})
            }
                return done(null,false,{message:'Wrong username or password'})
          }
            catch(error)
            {
                return done(null,false,{message: 'No user with this email'})
            }
        }))
    passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(user=>{
            done(null, user);
        })
        .catch(err=>{
            done(err, user);
        });
      });
      
    
}
module.exports=init;