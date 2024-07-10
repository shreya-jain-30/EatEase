require('dotenv').config()
const express = require('express');
const ejs=require('ejs');
const expressLayout=require('express-ejs-layouts');
const path = require('path');
const fs = require('fs');
const app=express();
const port = 80;
const mongoose= require('mongoose');
const session = require('express-session'); // middleware of express-js that allows session storage and management
const flash = require('connect-flash') // to flash msg to user for feedback
const MongoStore = require('connect-mongo')(express);
const passport=require('passport');

// app.get('/app.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'app.js'));
// });
app.use(express.static('public'));
app.use(express.json());

app.use(expressLayout);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/resources/views'));
// app.use('/contact',express.static(path.join(__dirname,'public')));

mongoose.connect(process.env.MONGO_CONNECTION_URL);   // to connect nodejs with mongodb using mongoose
// ,{
//   useNewUrlParser : true,
//   useCreateIndex: true,
//   useUnifiedTopology:true,
//   useFindAndModify: true
// });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
})

// express session middleware to handle sessions
app.use(session({
  secret: process.env.secretCookie,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection : db,
    collection : 'sessions'
  }),
  cookie: { maxAge: 1000*60*60*24 }
}))

// to use access sessions in view
app.use((req,res,next)=>{
  res.locals.session=req.session;
  res.locals.user=req.user;
  next();
})     

app.use(express.urlencoded({extended:true}));
//...
//passport middleware
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//to initialise flash middleware
app.use(flash())


// to use access flash messages in view
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// app.use(express.urlencoded({extended:true}));
//to accept request in the form of url
// app.use(express.urlencoded({extended:false}));

// app.use(express.json());



// app.use(expressLayout);
// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'/resources/views'));
// app.use('/contact',express.static(path.join(__dirname,'public')));
// app.use(express.static('public'));
require('./routes/web')(app);



app.listen(port,()=>{
    console.log(`App started at port ${port}`);
})
