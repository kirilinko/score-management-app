const jwt = require('jsonwebtoken');
const database = require('../Database/Database');

class Match{
    constructor() {
        this.connexion = database;
        this.resultat={};
        this.code="";
      }

/**
 * Ajouter un nouveau match
 * @param code_equipe_a - Le code de l'équipe A.
 * @param code_equipe_b - Le code de l'équipe B.
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
add(code_equipe_a, code_equipe_b, date_match){

    return new Promise((resolve, reject) => {
    const query = 'INSERT INTO matchs(code_equipe_a, code_equipe_b, date_match) VALUES(?, ?, ?)';
    this.connexion.query(query, [code_equipe_a, code_equipe_b, date_match], (err, results) => {
    
        if (err) {

            resolve({
                statut: false,
                message: `Une erreur est survenu lors de la création du match => erreur : ${err}`,
            });  

        } else {

            resolve({
                statut: true,
                message: "Macht entre les deux équipes créé avec succès"
            }); 
        }
        this.connexion.end();
                        
        });
     });

}

/**
 * Ajouter les scores d'un match
 * @param point_equipe_a - point de l'équipe A.
 * @param point_equipe_b - point de l'équipe B.
 * @param id_match - le code du match
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
add_score(point_equipe_a, point_equipe_b, id_match){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE matchs SET point_equipe_a=?, point_equipe_b=? WHERE id_match=?';
        this.connexion.query(query, [point_equipe_a,  point_equipe_b, id_match], (err, results) => {
        
            if (err) {
    
                resolve({
                    statut: false,
                    message: `Une erreur est survenu lors l'ajout des score pour le match : ${err}`,
                });  
    
            } else {
    
                resolve({
                    statut: true,
                    message: "Score ajouter avec success"
                }); 
            }
            this.connexion.end();
                            
            });
         });
}

/**
 * Ajouter les à une équipe. (utile pour le classement)
 * @param point - les point de l'équuipe pour un match.
 * @param id_match - le code du match
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
add_equipe_point(code_equipe, point){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE equipes SET point_total=point_total+? WHERE code_equipe=?';
        this.connexion.query(query, [code_equipe, point], (err, results) => {
    
            if (err) {
    
                resolve({
                    statut: false,
                    message: `Une erreur est survenue lors l'ajout des  points : ${err}`,
                });  
    
            } else {
    
                resolve({
                    statut: true,
                    message: "Point correctement ajouté"
                }); 
            }
            
            this.connexion.end();
                            
           });
      });

}

/**
 * Ajouter les  statistiques d'un jouer
 * @param code_joueur - le code du joueur
 * @param id_match - le code du match
 * @param point_joueur - le point que le joueur  à optenu  pour le match
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
add_statitique(code_joueur, id_match, point_joueur){
return new Promise((resolve, reject) => {
    const query = 'INSERT INTO statistiques(code_joueur, id_match, point_joueur) VALUES(?,?, ?)';
    this.connexion.query(query, [code_joueur, id_match, point_joueur], (err, results) => {

        if (err) {

            resolve({
                statut: false,
                message: `Une erreur est survenue lors l'ajout des statistiques du joueur : ${err}`,
            });  

        } else {

            resolve({
                statut: true,
                message: "Statistique du joueur correctement ajouté"
            }); 
        }
        
        this.connexion.end();
                        
       });
  });

}


/**
 * Valider les prédictions pour un match lors de l'ajout des scor
 * @param id_match - le code du match
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
validation_prediction(id_match){
 return new Promise((resolve, reject) => {
    const query = 'UPDATE utilisateurs SET point_prediction=point_prediction + ? WHERE code_utilisateur IN (SELECT code_utilisateur FROM predictions INNER JOIN matchs predictions.id_match=matchs.id_match WHERE matchs.id_match= ? AND predictions.point_equipe_a=matchs.point_equipe_a AND predictions.point_equipe_b=matchs.point_equipe_b)';
    this.connexion.query(query, [10, id_match], (err, results) => {
        
    if (err) {

        resolve({
            statut: false,
            message: `Une erreur est survenu lors de la validation des prédiction: ${err}`,
        });  

    } else {

        resolve({
            statut: true,
            message: "Predictions validé avec success"
        }); 
    }
    this.connexion.end();
                    
    });
 });

}

/**
 * Récupérrer toute les informations ayant rapport  à un match
 * @param id_match - le code du match
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
find(id_match){
    return new Promise((resolve, reject) => {
        const query = 'SELECT matchs.*, a.nom_equipe AS nom_a, b.nom_equipe AS nom_b FROM matchs INNER JOIN equipes a ON matchs.code_equipe_a=a.code_equipe INNER JOIN equipes b ON matchs.code_equipe_b=b.code_equipe WHERE matchs.id_match=?';
        this.connexion.query(query, [id_match], (err, results) => {
             
        if (err) {
    
            resolve({
                statut: false,
                message: `Une erreur est survenu lors de la validation des prédiction: ${err}`,
            });  
    
        } else {
    
            resolve({
                statut: true,
                message: "Information match trouvé",
                data : results
            }); 
        }
        this.connexion.end();
                        
        });
     });

}


/**
 * Retrouver les statistiques et informations des joueurs d'une équipe pour un match
 * @param id_match - le code du match
 * @param code_equipe - le code de l'équipe
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
find_joueur_equip(id_match, code_equipe){
    return new Promise((resolve, reject) => {
        const query = 'SELECT joueurs.*, statistiques.* FROM joueurs LEFT JOIN statistiques ON joueurs.code_joueur=statistiques.code_joueur INNER JOIN matchs ON statistiques.id_match=matchs.id_match WHERE matchs.id_match=? AND joueurs.code_equipe=?';
        this.connexion.query(query, [id_match, code_equipe], (err, results) => {
            
        if (err) {
    
            resolve({
                statut: false,
                message: `Une erreur est survenu lors de la validation des prédiction: ${err}`,
            });  
    
        } else {
    
            resolve({
                statut: true,
                message: "Predictions validé avec success",
                data: results
            }); 
        }
        this.connexion.end();
                        
        });
     });

}


}

module.exports=Match;