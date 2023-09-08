
const 
 express=require('express');
 bodyParser=require('body-parser');
 mysql = require('mysql')
 app=express();

// Routes 
var indexRouter = require('./Routes/Index/Index');
var userRouter = require('./Routes/User/User');


var userclass = require('./Classes/Match');

const Macht = require('./Classes/Match');

const matchd = new Macht();
matchd.find_joueur_equip(1,'EQUIPE/01')
.then((resultat) => {
     console.log(resultat); // Utilisez le résultat comme vous le souhaitez
   })
   .catch((erreur) => {
     console.error(erreur);
   });



   

// Template EJS
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/user', userRouter);

// JTW TOKEN CLE
process.env.SECRET_KEY = "KIRILINKO-CODE";



var port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`Serveur oprationnel sur le port ${port} `);
});