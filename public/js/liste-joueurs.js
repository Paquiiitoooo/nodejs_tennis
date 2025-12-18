import { JoueurService } from './services/joueurService.js';
import { Joueur } from './classes/joueur.js';
import { showMessage } from './modules/utils.js';

const dataContainer = document.getElementById('data-container');
const messageContainer = document.getElementById('message-container');
const joueurService = new JoueurService();

window.deleteJoueur = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
    return;
  }

  try {
    await joueurService.delete(id);
    showMessage('Joueur supprimé avec succès', 'success');
    loadJoueurs();
  } catch (error) {
    showMessage('Erreur lors de la suppression : ' + error.message, 'error');
  }
};

async function loadJoueurs() {
  try {
    dataContainer.innerHTML = '<p>Chargement des données...</p>';
    const joueursData = await joueurService.getAll();
    
    if (!joueursData || joueursData.length === 0) {
      dataContainer.innerHTML = '<p>Aucun joueur enregistré.</p>';
      return;
    }

    dataContainer.innerHTML = '';
    joueursData.forEach(data => {
      try {
        const joueur = new Joueur(data);
        dataContainer.innerHTML += joueur.render();
      } catch (err) {
        console.error('Erreur lors du rendu d\'un joueur:', err, data);
      }
    });
  } catch (error) {
    console.error('Erreur complète lors du chargement:', error);
    dataContainer.innerHTML = '<p>Erreur lors du chargement des joueurs.</p>';
    showMessage('Erreur : ' + error.message, 'error');
  }
}

loadJoueurs();

