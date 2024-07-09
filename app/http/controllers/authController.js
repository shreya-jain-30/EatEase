const User= require('../../models/user')
const bcrypt=require('bcrypt')
const passport=require('passport')
function authController(){
    const getUrl=(req)=>{
        return req.user.role==='admin'? '/admin-order': '/customer-order';
    }
    return{
        login(req,res){
            res.render('auth/login');
        },
        postLogin(req,res,next){
            console.log(req.body);
            passport.authenticate('local',{failureFlash:true},(err,user,info)=>{
                // console.log(info)
                // console.log(user)
                console.log(req.flash);
                console.log(info);
                
                if(err)
                {
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user)
                {
                    req.flash('error',info ? info.message : 'Invalid username or password')
                    return res.redirect('/login')
                }
                req.login(user,(err)=>{
                    if(err)
                    {
                        req.flash('error',info.message)
                        return next(err)
                    }
                return res.redirect('/')
            })
            })(req,res,next)
        },
        register(req,res){
            res.render('auth/register');
        },
        async postRegister(req,res){
            const {name, email, pswd} = req.body;

            const existingUser = await User.exists({ email: email });
                if (existingUser) {
                    req.flash('error', 'Email already taken');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            const hashedPswd= await bcrypt.hash(pswd,10);  //to hash the pswd
            const user= new User({
                name:name,
                email:email,
                pswd:hashedPswd
            })
            user.save().then((user)=>{
                return res.redirect('/');
            }).catch(err=>{
                req.flash('error','Something went wrong');
                return res.redirect('/register');
            })
            console.log(req.body)
        },
        postLogout(req,res){
            req.logout();
            return res.redirect('/');
        },
        getOrderPage(req,res){
            return res.redirect(getUrl(req));
        }
    }
}
module.exports = authController;