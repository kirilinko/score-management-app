var express = require('express');
const jwt = require('jsonwebtoken');
const Equipe = require('../../Classes/Equipe');
const Utilisteur = require('../../Classes/Utilisateur');
const Match = require('../../Classes/Match');
const equipe = new Equipe();
const match = new Match();
const utilisateur = new Utilisteur();
var user = express.Router();
 

user.use(function(requet, reponse, next) {
    const token = process.env.TOKEN_SECRET;
    console.log(token)
    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err) {
            if (err) {
                console.error(err);
                appData["statut"] = false;
                appData["data"] = "Le Token est invalide";
                reponse.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["statut"] = false;
        appData["message"] = "Absence de token dans la requête. Impossible d'accéder à cette ressource.";
        reponse.status(403).json(appData);
    }
});




// Ajouter un Match
user.get('/addMatch', (requet,reponse)=>{
    equipe.all()
    .then((resultat) => {
        match.all()
        .then((resultat_match) => {
            reponse.render('utilisateur/add_match',{'equipes':resultat.data, 'matchs':resultat_match.data})
         })

      })
      .catch((erreur) => {
        console.error(erreur);
      });
    
})


user.post('/addMatch', (requet,reponse)=>{
    var {teamA, teamB, date_match} =requet.body;
    match.add(teamA,teamB, date_match)
    .then((resultat) => {

         reponse.redirect('/user/addMatch') 

      })
      .catch((erreur) => {
        console.error(erreur);
      });
    
})



user.get('/addScore', (requet,reponse)=>{
    match.all_match_without_score()
    .then((resultat) => {
        console.log(resultat);
       reponse.render('utilisateur/add_score',{'matchs':resultat.data})
      })
      .catch((erreur) => {
        console.error(erreur);
      });
 
})

// Ajouter un Score
user.post('/addScore', (requet,reponse)=>{
    var {teamA_score, teamB_score, id_match} =requet.body;
    match.add_score(teamA_score, teamB_score, id_match)
    .then((resultat) => {
        
        reponse.redirect('/user/addScore')
         
      })
      .catch((erreur) => {
        reponse.status(403).json(erreur);
      });
 
})


user.get('/addPrediction', (requet,reponse)=>{
    match.all_match_without_score()
    .then((resultat) => {
        console.log(resultat);
        reponse.render('utilisateur/predict_match',{'matchs':resultat.data})
      })
      .catch((erreur) => {
        reponse.status(403).json(erreur);
      });

})


user.post('/addPrediction', (requet,reponse)=>{
    
    var decodedToken = jwt.decode(process.env.TOKEN_SECRET);
    var {teamA_score, teamB_score, id_match} =requet.body;

    utilisateur.prediction(id_match, teamA_score, teamB_score, decodedToken.codeUser)
    .then((resultat) => {
         
        reponse.redirect('/user/addPrediction')
      })
      .catch((erreur) => {
        reponse.status(403).json(erreur);
      });

})






module.exports = user;