var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://vishnu:12345@ds151941.mlab.com:51941/vmeantodos', ['todos']);

//Get todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if(err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});

//get single todo
router.get('/todo/:id', function(req, res, next) {
    db.todo.findOne( {
        _id: mongojs.ObjectId(req.params.id+'')
    }, function(err, todo) {
        if(err) {
            console.log('error');
            res.send(err);
        } else {
            console.log('got todo');
            console.log(todo);
            res.json(todo);
        }
    })
});

// Save todo
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid data"
        })
    } else {
        db.save(todo, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

// Update todo
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text) {
        updObj.text = todo.text;
    }

    if(!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if(err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

// Delete todo
router.delete('/todo/:id', function(req, res, next) {

    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = router;