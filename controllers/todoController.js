var bodyParser = require('body-parser');

var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@todo-bqgge.mongodb.net/test?retryWrites=true')

var todoSchema  = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema)

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })
    //res.render('todo', {todos: data});
    console.log('in get')
  });
  app.post('/todo', urlencodedParser,function(req, res){
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data)
    })
    //data.push(req.body);
    console.log("in post")
    //res.json(data)
  });
  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data)
    });
  });
};
