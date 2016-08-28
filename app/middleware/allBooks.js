'use strict'
let path= process.cwd();
var Books = require(path+'/app/models/books');

module.exports=function(req,res,next){
    Books.find({},function(err,books){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        res.send({books});
        next();
    });
 
}