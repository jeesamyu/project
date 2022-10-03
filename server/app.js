require('./config/config');
require('./models/db');
require('./config/passport.config')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const router = express.Router();
const rtsIndex = require('./routes/index.router');
const passport = require('passport');


var app = express();
// middle ware connections
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);

app.get('/',(req,res)=>{
    res.send('successfully get')
})

app.use((err,res,req ,next)=>{
    if(err.name === 'ValidationEorror'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
})


// start server
app.listen(process.env.PORT , () => console.log(`server started at port : ${process.env.PORT}`));