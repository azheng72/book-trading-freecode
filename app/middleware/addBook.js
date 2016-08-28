'use strict'
let path=process.cwd();
var User = require(path+'/app/models/user');
var Books = require(path+'/app/models/books');
var googleBook=require(path+'/app/factory/googleBook');

module.exports=function(req,res,next){
    googleBook(req.body.search,function(err,response,body){
        let myObject=JSON.parse(body);
        try{
        
            let title=myObject.items[0].volumeInfo.title;
            let image=myObject.items[0].volumeInfo.imageLinks.thumbnail;
            
            User.findOne({'user.username':req.user.user.username},
            function(err,user){
                if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
                if (!user) {
                    console.log("username not found");
                    res.status('400');
                    return res.end();
                 }
                let newBooks=new Books;
                newBooks.title=title;
                newBooks.image=image;
                newBooks.traded=false;
                newBooks.save(function(err){
                        if(err) throw err;
                        console.log('addBook to books collection','success');
                    });
                user.books.push({title:title,image:image});
                user.save(function (err) {  //save to db
            			if (err) {throw err;}
        			    console.log('add book to user collection','success');
        			    res.send({books:user.books});
                        next();
                    });
            });
        }
        catch(err){
            console.error('/middleware/addBook:',err);
            res.status('400');
            return res.end();
        }
    });
}
