const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err){
        console.log('MongoDB connection sucessful.');
    }else{
        console.log('Error in MongoBD connection :' + JSON.stringify(err, undefined ,2));
    }
});

require('./user.model');