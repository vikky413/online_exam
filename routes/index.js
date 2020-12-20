var express = require('express');
var router = express.Router();
var signupModel = require('../modules/register');
var jwt = require('jsonwebtoken'); 



if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ONLINE EXAM' , msg:'' });
});



router.post('/', function(req, res, next) {

  var username= req.body.username;
  var password = req.body.password;
  var checkuser = signupModel.findOne({username:username});
  checkuser.exec((err,data)=>{
    if(data==null){
      res.render('index',{title:'ONLINE EXAM',msg:'INVALID USERNAME OR PASSWORD'});
    }
    else{
    if(err) throw err;
    var getUserId = data._id;
    var getpassword = data.password;
    if(password==getpassword){
     var token = jwt.sign({ userId:getUserId }, 'loginToken');
     localStorage.setItem('userToken', token);
     localStorage.setItem('Loginuser', username);
     res.redirect('./exam')
    }
    else{
 res.render('index', { title: 'ONLINE EXAM',msg:'Invalid username and password' });
    }
   }
  });
});








// Signup 

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'ONLINE EXAM' , msg:'' });
});
router.post('/signup', function(req, res, next) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
 
  var signupDetails = new signupModel({
    name:name,
    username:username,
    password:password,
    email:email
    
  });
   signupDetails.save((err,doc)=>{
     if(err) throw err;
  res.render('signup', { title: 'ONLINE EXAM' , msg:'REGISTER SUCCESS' });
   
   })
  
});






router.get('/exam', function(req, res, next) {
  res.render('exam', { title: 'Express' });
});
router.get('/final', function(req, res, next) {
  res.render('final', { title: 'Express' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});
router.get('/starttest', function(req, res, next) {
  res.render('starttest', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});
router.get('/viewans', function(req, res, next) {
  res.render('viewans', { title: 'Express' });
});


router.get('/admin_login', function(req, res, next) {
  res.render('admin_login', { title: 'Express',msg:'' });
});
router.post('/admin_login', function(req, res, next) {
    var adminUser = req.body.adminUser;
    var adminPass = req.body.adminPass;
    if(adminUser =='Deepak94' && password == 'Deepak@123'){

    }else{

  res.render('admin_login', { title: 'Express',msg:'INVALID USERNAME AND PASSWORD' });
    }
});

router.get('/quesadd', function(req, res, next) {
  res.render('quesadd', { title: 'Express' });
});
router.get('/queslist', function(req, res, next) {
  res.render('queslist', { title: 'Express' });
});
router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Express' });
});





module.exports = router;
