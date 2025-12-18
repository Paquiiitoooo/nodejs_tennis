export class Tournoi {
  constructor(data) {
    this._id = data._id || data.id || null;
    this._name = data.name || '';
    this._date = data.date || '';
    this._lieu = data.lieu || '';
    this._participants = data.participants || [];
    this._prize_money = data.prize_money || 0;
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

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get lieu() {
    return this._lieu;
  }

  set lieu(value) {
    this._lieu = value;
  }

  get participants() {
    return this._participants;
  }

  set participants(value) {
    this._participants = value;
  }

  get prize_money() {
    return this._prize_money;
  }

  set prize_money(value) {
    this._prize_money = value;
  }

  toJSON() {
    return {
      name: this._name,
      date: this._date,
      lieu: this._lieu,
      participants: this._participants.map(p => typeof p === 'object' ? p._id || p.id : p),
      prize_money: this._prize_money
    };
  }

  render() {
    const dateFormatted = this._date ? new Date(this._date).toLocaleDateString('fr-FR') : 'Non défini';
    const participantsCount = this._participants ? this._participants.length : 0;
    return `
      <div class="data-item">
        <div class="data-item-info">
          <h3>${this._name}</h3>
          <p><strong>Date:</strong> ${dateFormatted}</p>
          <p><strong>Lieu:</strong> ${this._lieu}</p>
          <p><strong>Participants:</strong> ${participantsCount}</p>
          <p><strong>Prize Money:</strong> ${this._prize_money}€</p>
        </div>
        <div class="data-item-actions">
          <button class="btn-edit" onclick="window.location.href='edit-tournoi.html?id=${this._id}'">Modifier</button>
          <button class="btn-delete" onclick="deleteTournoi('${this._id}')">Supprimer</button>
        </div>
      </div>
    `;
  }
}

