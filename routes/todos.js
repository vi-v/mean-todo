var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://vishnu:12345@ds151941.mlab.com:51941/vmeantodos', ['todos']);

router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if(err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});

module.exports = router;