var express = require('express');
var router = express.Router();
var mysql=require('mysql')
var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123',
    database:'think201',
    connectionLimit:100,
    multipleStatements:true
    })

var multer = require('multer');
var storage = multer.diskStorage({
      destination:(req,file,path)=>
      {path(null,'public/images')},
      filename:(req,file,path)=>{
        path(null,file.originalname)
      }
    });
var upload=multer({storage:storage})

/* GET home page. */
router.post('/studentdata', upload.single('photo'),function(req, res, next) {
    console.log(req.body)
     pool.query('insert into student(name,email,phone,image,degree) values (?,?,?,?,?)',[req.body.name,req.body.email,req.body.phone,req.file.filename,req.body.degree],function(error,result){
       if(error)
        {
          console.log(error)
         return res.status(500).json({RESULT:false})
        }
        else 
        {
         
         return res.status(200).json({RESULT:true})
        
 
        }
     }
 )});



 router.get('/studentlist',function(req, response, next) {
  pool.query('select * from student',function(error,result){
    if(error)
    {return response.status(500).json([])}
    else{
     return response.status(200).json(result)
    }

  })

 });

 router.post('/studentdetail',function(req, response, next) {
  pool.query('select * from student where sno=?',[req.body.sno],function(error,result){
    if(error)
    {return response.status(500).json([])}
    else{
     return response.status(200).json(result)
    }

  })


})

router.post('/updatedata', function(req, res, next) {
  console.log(req.body)
   pool.query('update student set name=? ,email=?,phone=?,degree=? where sno=?',[req.body.name,req.body.email,req.body.phone,req.body.degree,req.body.sno],function(error,result){
     if(error)
      {
        console.log(error)
       return res.status(500).json({RESULT:false})
      }
      else 
      {
       
       return res.status(200).json({RESULT:true})
      

      }
   }
)});

router.post('/updateimage', upload.single('photo'),function(req, res, next) {
  console.log(req.body)
   pool.query('update student set image=? where sno=?',[req.file.filename,req.body.sno],function(error,result){
     if(error)
      {
        console.log(error)
       return res.status(500).json({RESULT:false})
      }
      else 
      {
       
       return res.status(200).json({RESULT:true})
      

      }
   }
)});

router.post('/searchdata',function(req, response, next) {
  console.log(req.body)
 pool.query('select * from student where name like "%"?"%" or email like "%"?"%" or phone like "%"?"%" or degree like "%"?"%"  ',[req.body.searchvalue,req.body.searchvalue,req.body.searchvalue,req.body.searchvalue]  ,function(error,result){
   if(error)
   {return response.status(500).json([])}
   else{
    return response.status(200).json(result)
   }

 })


});


module.exports = router;
