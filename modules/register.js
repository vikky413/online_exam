const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exam',{ useNewUrlParser:true , useCreateIndex:true,});

var conn = mongoose.Collection;
var signupSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
   
    username :{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
   
    date:{
        type: Date, 
        default: Date.now }
});
var signupModel = mongoose.model('users',signupSchema);
module.exports = signupModel;