class Utilisateur {
    constructor(data) {
      this.id = data.id || '';
      this.nom = data.nom || '';
      this.prenom = data.prenom || '';
      this.isAdmin = data.isAdmin || false;
      this.identifiant = data.identifiant || '';
      this.motDePasse = data.motDePasse || '';
    }
  }