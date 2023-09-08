var express = require('express');
var index = express.Router();




index.get('/', (requet,reponse)=>{
    
    reponse.render('classement')

})


index.get('/Connexion', (requet,reponse)=>{
    reponse.render('connexion')
})






module.exports = index;