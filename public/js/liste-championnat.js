import { ChampionnatService } from './services/championnatService.js';
import { Championnat } from './classes/championnat.js';
import { showMessage } from './modules/utils.js';

const dataContainer = document.getElementById('data-container');
const messageContainer = document.getElementById('message-container');
const championnatService = new ChampionnatService();

window.deleteChampionnat = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce championnat ?')) {
    return;
  }

  try {
    await championnatService.delete(id);
    showMessage('Championnat supprimé avec succès', 'success');
    loadChampionnats();
  } catch (error) {
    showMessage('Erreur lors de la suppression : ' + error.message, 'error');
  }
};

async function loadChampionnats() {
  try {
    dataContainer.innerHTML = '<p>Chargement des données...</p>';
    const championnatsData = await championnatService.getAll();
    
    if (!championnatsData || championnatsData.length === 0) {
      dataContainer.innerHTML = '<p>Aucun championnat enregistré.</p>';
      return;
    }

    dataContainer.innerHTML = '';
    championnatsData.forEach(data => {
      try {
        const championnat = new Championnat(data);
        dataContainer.innerHTML += championnat.render();
      } catch (err) {
        console.error('Erreur lors du rendu d\'un championnat:', err, data);
      }
    });
  } catch (error) {
    console.error('Erreur complète lors du chargement:', error);
    dataContainer.innerHTML = '<p>Erreur lors du chargement des championnats.</p>';
    showMessage('Erreur : ' + error.message, 'error');
  }
}

loadChampionnats();

