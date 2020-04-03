const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res) => {
    res.render("user/addOrEdit", {
        viewTitle: "Insert User"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
    // console.log(req.body)
});


function insertRecord(req, res) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = hash;
        user.save((err, doc) => {
            if (!err)
                res.redirect('user/list');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("user/addOrEdit", {
                        viewTitle: "Insert User",
                        user: req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    });


}

function updateRecord(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        User.findOne({ _id: req.body._id }, function (err, user) {
            if (user) {
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.body.password !== "")
                {
                    user.password = hash;
                }
              
                user.save((err, doc) => {

                    if (!err) { res.redirect('user/list'); }
                    else {
                        if (err.name == 'ValidationError') {
                            handleValidationError(err, req.body);
                            res.render("user/addOrEdit", {
                                viewTitle: 'Update User',
                                user: req.body
                            });
                        }
                        else
                            console.log('Error during record update : ' + err);
                    }
                });
            }

        });
    });
}

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("user/list", {
                list: docs.map(doc => doc.toJSON()),
                viewTitle: "List Users"


            });
        }
        else {
            console.log('Error in retrieving user list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/addOrEdit", {
                viewTitle: "Update User",
                user: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});

module.exports = router;