var express = require('express');
var index = express.Router();
const Utilidateur = require('../../Classes/Utilisateur');
const user = new Utilidateur();




index.get('/', (requet,reponse)=>{
    
    reponse.render('classement')

})


index.get('/Connexion', (requet,reponse)=>{
    
user.connecter('kirilinko', '00000')
.then((resultat) => {
     console.log(resultat); // Utilisez le résultat comme vous le souhaitez
     process.env.TOKEN_SECRET= resultat.token
     console.log(process.env.TOKEN_SECRET);
     reponse.render('connexion')
   })
   .catch((erreur) => {
     console.error(erreur);
   });


    
})






module.exports = index;