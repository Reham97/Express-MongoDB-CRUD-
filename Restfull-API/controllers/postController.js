const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');


router.get('/', (req, res) => {
    Post.find((err, docs) => {
        if (!err) {
            res.render("post/list", {
                list: docs.map(doc => doc.toJSON()),
                viewTitle: "List Posts"
            });
        }
        else {
            console.log('Error in retrieving post list :' + err);
        }
    });
});

router.get('/:id/add', (req, res) => {
    User.findById(req.params['id'], (err, doc) => {
       if (!err) {
        res.render("post/add", {
                user: doc ,
                viewTitle: "Add Post"
            });
        }
        else
        {
            console.log('Not found User : ' + err);
        } 
    });
});

router.post('/', (req, res) => {  

    User.findById(req.body._id,(err, doc) => {
        var post = new Post();
        post.title = req.body.title;
        post.body = req.body.body;
        post.creator = doc;
        // res.send(post);
        post.save((err, doc2) => {
            if (!err)
                res.redirect('/post/');
            else {          
                if (err.name == 'ValidationError') {
                    errors=[]
                    handleValidationError(err, errors);
                    res.redirect('/post/'+req.body._id+'/list',
                    {errors:errors}
                    );
                }
                
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

        
        
     });

       
});

router.get('/:id/list', (req, res) => {

      User.findById(req.params['id'], (err, doc) => {
        if (!err) {
            Post.find({creator:doc._id}, (err, docs) => {
                if (!err) {
                           res.render("post/list", {
                            list: docs.map(d => d.toJSON()),
                            viewTitle: "List Posts 0f "+doc.name
                       });

        
        
                 }
            });

             


         
         }
         else
         {
             console.log('Not found User : ' + err);
         } 
     });
});




function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            case 'body':
                body['bodyError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;