var express = require('express');
var index = express.Router();
const Utilidateur = require('../../Classes/Utilisateur');
const user = new Utilidateur();
const socketIo = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketIo(server);





index.get('/', (requet,reponse)=>{
     reponse.render('connexion')
  
})


index.post('/', (requet,reponse)=>{
    var {username, password} = requet.body;
    user.connecter(username, password)
    .then((resultat) => {
        
         if(resultat.statut){
            process.env.TOKEN_SECRET= resultat.token
            reponse.redirect('/user/addMatch') 
         }
           else{
            reponse.status(403).json(resultat);
           }
        
       })
       .catch((erreur) => {
        reponse.status(403).json(erreur);
       });
    
    
        
    })






module.exports = index;