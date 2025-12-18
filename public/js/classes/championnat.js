export class Championnat {
  constructor(data) {
    this._id = data._id || data.id || null;
    this._name = data.name || '';
    this._division = data.division || '';
    this._saison = data.saison || '';
    this._clubs = data.clubs || [];
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

  get division() {
    return this._division;
  }

  set division(value) {
    this._division = value;
  }

  get saison() {
    return this._saison;
  }

  set saison(value) {
    this._saison = value;
  }

  get clubs() {
    return this._clubs;
  }

  set clubs(value) {
    this._clubs = value;
  }

  toJSON() {
    return {
      name: this._name,
      division: this._division,
      saison: this._saison,
      clubs: this._clubs.map(club => typeof club === 'object' ? club._id || club.id : club)
    };
  }

  render() {
    let clubsText = 'Aucun club';
    if (this._clubs && this._clubs.length > 0) {
      const clubNames = this._clubs.map(club => {
        return typeof club === 'object' ? club.name : 'Club inconnu';
      });
      clubsText = clubNames.join(', ');
    }
    return `
      <div class="data-item">
        <div class="data-item-info">
          <h3>${this._name}</h3>
          <p><strong>Division:</strong> ${this._division}</p>
          <p><strong>Saison:</strong> ${this._saison}</p>
          <p><strong>Clubs:</strong> ${clubsText}</p>
        </div>
        <div class="data-item-actions">
          <button class="btn-edit" onclick="window.location.href='edit-championnat.html?id=${this._id}'">Modifier</button>
          <button class="btn-delete" onclick="deleteChampionnat('${this._id}')">Supprimer</button>
        </div>
      </div>
    `;
  }
}

