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
    db.getAllDoc(function(err,result){
        db.getallappointment(function(err,result1){
        var total_doc = result.length ;
        var appointment = result1.length; 
        res.render('home.ejs',{doc : total_doc , doclist : result, appointment : appointment, applist : result1});
        });
        //console.log(result.length);
        
    });
   
});


router.get('/departments',function(req,res){

    db.getalldept(function(err,result){

        res.render('departments.ejs',{list:result});

    });
    
});

router.get('/add_departments',function(req,res){
    res.render('add_departments.ejs');
});

router.post('/add_departments',function(req,res){
    var name = req.body.dpt_name;
    var desc = req.body.desc;
    db.add_dept(name,desc,function(err,result){
        res.redirect('/home/departments');
    });
});


router.post('/delete_department/:id',function(req,res){
    var id = req.params.id;
    db.delete_department(id,function(err,result){
        res.redirect('/home/departments');
    });
});

router.get('/edit_department/:id',function(req,res){
    var id = req.params.id;
    db.getdeptbyId(id,function(err,result){
        res.render('edit_department.ejs',{list:result});
    })
});


router.post('/edit_department/:id',function(req,res){

    db.edit_dept(req.params.id,req.body.dpt_name,req.body.desc,function(err,result){
        res.redirect('/home/departments');
    });
});

module.exports =router;