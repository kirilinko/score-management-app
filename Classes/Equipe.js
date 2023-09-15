
const database = require('../Database/Database');

class Equipe {
    constructor() {
        this.connexion = database;
        this.resultat={};
      }


/**
 * liste de toute les équipe
 * @returns {Promise} Une promesse qui résout avec un objet contenant le statut et un message.
 */
all() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM equipes';
      this.connexion.query(query, [], (err, results) => {
  
          if (err) {
              console.log(err)
              resolve({
                  statut: false,
                  message: "Une erreur est survenu lors de récupération des équipes",
              });  
  
          } else {
  
              resolve({
                  statut: true,
                  message: "Récupération effectuée !",
                  data:results
              }); 
          }

  
      });
   });
  }
}

module.exports=Equipe;