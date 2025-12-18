export class ChampionnatService {
  constructor() {
    this.baseUrl = '/api/championnats';
  }

  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de la récupération des championnats' }));
        throw new Error(errorData.error || errorData.message || 'Erreur lors de la récupération des championnats');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération du championnat');
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
        throw new Error(error.error || 'Erreur lors de la création du championnat');
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
        throw new Error(error.error || 'Erreur lors de la mise à jour du championnat');
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
      if (!response.ok) throw new Error('Erreur lors de la suppression du championnat');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

