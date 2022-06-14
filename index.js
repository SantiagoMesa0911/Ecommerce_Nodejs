const express = require('express');
const session  = require('express-session')
const morgan = require('morgan');
const cookie = require('cookie-parser');
const { port,sessionSecret} = require('./config');
const { connection } = require('./config/db');
const passport = require('passport');
const cors = require('cors');


//Routes
const users = require('./routes/user');
const auth = require('./routes/auth');
const cart =require('./routes/cart');
const products = require('./routes/products')
const { useGoogleStrategy, useFacebookStrategy ,useTwitterStrategy} = require('./middleware/authProvider');


const app = express();
connection();

//UTLIZANDO MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));
app.use(cookie());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))
app.use(session({
  secret:sessionSecret,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())

//Usando Strtegias..
passport.use(useGoogleStrategy())
passport.use(useFacebookStrategy())
passport.use(useTwitterStrategy())
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})


users(app);
auth(app);
cart(app)
products(app)




app.get("/", (req, res) => {
  return res.json({
    name: "Ecommerce v2"
  })
})


app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port}`);
});
