export class ClubService {
  constructor() {
    this.baseUrl = '/api/clubs';
  }

  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de la récupération des clubs' }));
        throw new Error(errorData.error || errorData.message || 'Erreur lors de la récupération des clubs');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération du club');
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
        throw new Error(error.error || 'Erreur lors de la création du club');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

