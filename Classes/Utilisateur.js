const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../Database/Database');

class Utilisateur {
  constructor() {
    this.connexion = database;
    this.resultat={};
  }

/**
 * Connexion de l'utilisateur
 * @param username - identifiant
 * @param password - mot de passe
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
connecter(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM utilisateurs WHERE username = ?';
    this.connexion.query(query, [username], (err, results) => {

        if (results.length === 1) {
            const password_crypter = results[0].password;

            bcrypt.compare(password, password_crypter, (err, match) => {
                if (match) {
                    const token = jwt.sign({ codeUser: results[0].code_utilisateur }, process.env.SECRET_KEY, {  expiresIn: '24h' });
                    resolve({
                        statut: true,
                        message: `${username} est maintenant connecté.`,
                        token: token
                    });  

                } else {

                    resolve({
                        statut: false,
                        message: "Nom d'utilisateur ou mot de passe incorrect"
                    }); 
                }
                 
            });

        } else {

            resolve({
                statut: false,
                message: "Nom d'utilisateur inexistant"
            }); 

            
        }
    });
 });
}

/**
 * Connexion de l'utilisateur
 * @param codeMatch - identifiant
 * @param point_eA - point equipe A
 * @param point_eB - point equipe B
 * @param codeUtilisateur - code de l'utilisateur qui veux faire la prédiction
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
prediction(id_match, point_eA, point_eB, codeUtilisateur) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO predictions(id_match, point_equipe_a, point_equipe_b, code_utilisateur )  VALUES(?, ?, ?, ?)';
    this.connexion.query(query, [id_match, point_eA, point_eB, codeUtilisateur], (err, results) => {

        if (err) {
           console.log(err)
            resolve({
                statut: false,
                message: "Une erreur est survenu lors de la prédiction",
            });  

        } else {

            resolve({
                statut: false,
                message: "Prédiction éffectué avec success"
            }); 
        }
      

    });
 });
}






}


module.exports=Utilisateur;