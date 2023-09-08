
const 
 express=require('express');
 bodyParser=require('body-parser');
 mysql = require('mysql')
 app=express();

// Routes 
var indexRouter = require('./Routes/Index/Index');
var userRouter = require('./Routes/User/User');



// Template EJS
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// JTW TOKEN CLE
process.env.SECRET_KEY = "KIRILINKO-CODE";



var port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`Serveur oprationnel sur le port ${port} `);
});