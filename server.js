const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const indexRouter = require('./routes/index')
// const menuRouter = require('./routes/menu')
// const loginRouter = require('./routes/login')


require('dotenv').config({path: './config/.env'})

//We are not using passport yet
// Passport config
//require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //pull stuff from forms
app.use(express.json()) //pull stuff from forms 
app.use(logger('dev')) //morgan

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }), //changes
    })
  )


// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

app.use(flash()) //flash when the signup fails
  
app.use('/', indexRouter)
// app.use('/menu', menuRouter)
// app.use('/login', loginRouter)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})