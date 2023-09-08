var express = require('express');
var user = express.Router();




user.get('/addMatch', (requet,reponse)=>{
    
    reponse.render('utilisateur/add_match')

})


user.get('/addScore', (requet,reponse)=>{
    reponse.render('utilisateur/add_score')
})


user.get('/addPrediction', (requet,reponse)=>{
    reponse.render('utilisateur/predict_match')

})






module.exports = user;