import { TournoisService } from './services/tournoisService.js';
import { Tournoi } from './classes/tournoi.js';
import { showMessage } from './modules/utils.js';

const dataContainer = document.getElementById('data-container');
const messageContainer = document.getElementById('message-container');
const tournoisService = new TournoisService();

window.deleteTournoi = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ?')) {
    return;
  }

  try {
    await tournoisService.delete(id);
    showMessage('Tournoi supprimé avec succès', 'success');
    loadTournois();
  } catch (error) {
    showMessage('Erreur lors de la suppression : ' + error.message, 'error');
  }
};

async function loadTournois() {
  try {
    dataContainer.innerHTML = '<p>Chargement des données...</p>';
    const tournoisData = await tournoisService.getAll();
    
    if (tournoisData.length === 0) {
      dataContainer.innerHTML = '<p>Aucun tournoi enregistré.</p>';
      return;
    }

    dataContainer.innerHTML = '';
    tournoisData.forEach(data => {
      const tournoi = new Tournoi(data);
      dataContainer.innerHTML += tournoi.render();
    });
  } catch (error) {
    dataContainer.innerHTML = '<p>Erreur lors du chargement des tournois.</p>';
    showMessage('Erreur : ' + error.message, 'error');
  }
}

loadTournois();

