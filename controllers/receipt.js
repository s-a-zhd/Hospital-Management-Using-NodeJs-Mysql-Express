var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
    db.getAllemployee(function(err,result){
        res.render('salary.ejs',{employee : result});
    })
});

router.get('/generateslip/:id',function(req,res){
    var id = req.params.id;
    res.render('payslip.ejs');
});





module.exports =router;