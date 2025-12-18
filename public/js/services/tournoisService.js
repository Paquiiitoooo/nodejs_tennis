export class TournoisService {
  constructor() {
    this.baseUrl = '/api/tournois';
  }

  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de la récupération des tournois' }));
        throw new Error(errorData.error || errorData.message || 'Erreur lors de la récupération des tournois');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de la récupération du tournoi' }));
        throw new Error(errorData.error || errorData.message || 'Erreur lors de la récupération du tournoi');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création du tournoi');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la mise à jour du tournoi');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du tournoi');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async addParticipant(tournoiId, joueurId) {
    try {
      const response = await fetch(`${this.baseUrl}/${tournoiId}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ joueurId })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout du participant');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

