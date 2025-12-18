export class Joueur {
  constructor(data) {
    this._id = data._id || data.id || null;
    this._name = data.name || '';
    this._classement = data.classement || '';
    this._age = data.age || 0;
    this._club = data.club || null;
    this._championnat_equipe = data.championnat_equipe || null;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get classement() {
    return this._classement;
  }

  set classement(value) {
    this._classement = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  get club() {
    return this._club;
  }

  set club(value) {
    this._club = value;
  }

  get championnat_equipe() {
    return this._championnat_equipe;
  }

  set championnat_equipe(value) {
    this._championnat_equipe = value;
  }

  toJSON() {
    return {
      name: this._name,
      classement: this._classement,
      age: this._age,
      club: typeof this._club === 'object' ? this._club._id || this._club.id : this._club,
      championnat_equipe: typeof this._championnat_equipe === 'object' ? this._championnat_equipe._id || this._championnat_equipe.id : this._championnat_equipe
    };
  }

  render() {
    const clubName = this._club && typeof this._club === 'object' ? this._club.name : 'Non défini';
    return `
      <div class="data-item">
        <div class="data-item-info">
          <h3>${this._name}</h3>
          <p><strong>Classement:</strong> ${this._classement}</p>
          <p><strong>Âge:</strong> ${this._age} ans</p>
          <p><strong>Club:</strong> ${clubName}</p>
        </div>
        <div class="data-item-actions">
          <button class="btn-edit" onclick="window.location.href='edit-joueur.html?id=${this._id}'">Modifier</button>
          <button class="btn-delete" onclick="deleteJoueur('${this._id}')">Supprimer</button>
        </div>
      </div>
    `;
  }
}

