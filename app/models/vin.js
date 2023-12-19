class Vin {
    constructor(data) {
      this.id = data.id || '';               // Identifiant unique de la bouteille de vin
      this.nom = data.nom || '';             // Nom du vin
      this.domaine = data.domaine || '';     // Domaine/producteur
      this.millesime = data.millesime || 0;  // Millésime
      this.region = data.region || '';       // Région de production
      this.pays = data.pays || '';           // Pays de production
      this.description = data.description || '';  // Description du vin
      this.note = data.note || 0;            // Note ou évaluation du vin
      this.imageURL = data.imageURL || '';   // URL de l'image de la bouteille
      this.creeLe = data.creeLe || '';       // Date de création de l'entrée
      this.misAjourLe = data.misAjourLe || '';// Date de la dernière mise à jour
    }
  }
  