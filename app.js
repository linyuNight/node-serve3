var express = require('express');
var ejs = require('ejs');// 后台模板库
var app = express();
var compression = require('compression');//开启gzip
app.use(compression());//开启gzip

// app.locals.title = '测试';

var fs = require("fs");
app.get('/listUsers', function (req, res) {
   	fs.readFile( __dirname + "/" + "/public/users.json", 'utf8', function (err, data) {
       	console.log( data );
       	res.end( data );
   	});
})
app.get('/listUsers/:id', function (req, res) {
   	// 首先我们读取已存在的用户
   	fs.readFile( __dirname + "/" + "/public/users.json", 'utf8', function (err, data) {
       	data = JSON.parse( data );
       	var user = data["user" + req.params.id] 
       	console.log( user );
       	res.end( JSON.stringify(user));
   	});
})
app.get('/', function (req, res) {
    res.render("index",{title:'header'});
})
app.get('/a.html', function (req, res) {
   	res.render("a");
})

app.get('/b.html', function (req, res) {
   	res.render("b");
})

app.get('/first.html', function (req, res) {
    res.render("first",{title:'first'});
})

app.get('/second.html', function (req, res) {
    res.render("second",{title:'second'});
})

app.set('views', './public');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static('public'));

// app.get('/', function (req, res) {
//    // res.sendFile( __dirname + "/views/" + "index.html" );
//    // res.redirect('/index.html');//下面要有app.get => /index.html的路径才可以重定向到这里
//    res.render('index');
// })

// app.get('/index.html', function (req, res) {
//    // res.sendFile( __dirname + "/views/" + "index.html" );
//    res.render('index');
// })

app.get('/a.html', function (req, res) {
  // res.sendFile( __dirname + "/views/" + "index.html" );

  res.render('a');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';  

// var selectData = function(db, callback) {  
//   //连接到表  
//   var collection = db.collection('tb2');
//   //查询数据
//   var whereStr = {"name":'wilson002'};
//   collection.find(whereStr).toArray(function(err, result) {
//     if(err)
//     {
//       console.log('Error:'+ err);
//       return;
//     }     
//     callback(result);
//   });
// }

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//   console.log("连接成功！");
//   selectData(db, function(result) {
//     console.log(result);
//     db.close();
//   });
// });