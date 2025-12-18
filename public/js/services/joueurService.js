export class JoueurService {
  constructor() {
    this.baseUrl = '/api/joueurs';
  }

  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        let errorMessage = 'Erreur lors de la récupération des joueurs';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erreur dans getAll joueurs:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de la récupération du joueur' }));
        throw new Error(errorData.error || errorData.message || 'Erreur lors de la récupération du joueur');
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
        throw new Error(error.error || 'Erreur lors de la création du joueur');
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
        throw new Error(error.error || 'Erreur lors de la mise à jour du joueur');
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
      if (!response.ok) throw new Error('Erreur lors de la suppression du joueur');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

