import { TournoisService } from './services/tournoisService.js';
import { JoueurService } from './services/joueurService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage, getUrlParameter } from './modules/utils.js';

const editForm = document.getElementById('edit-form');
const messageContainer = document.getElementById('message-container');
const tournoisService = new TournoisService();
const joueurService = new JoueurService();
const validator = new FormValidator(editForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('date', Rules.required);
validator.addRule('lieu', Rules.required);
validator.addRule('prize_money', Rules.required);

const tournoiId = getUrlParameter('id');

async function loadJoueurs() {
  try {
    const joueurs = await joueurService.getAll();
    const participantsSelect = document.getElementById('participants');
    participantsSelect.innerHTML = '';
    
    joueurs.forEach(joueur => {
      const option = document.createElement('option');
      option.value = joueur._id;
      option.textContent = joueur.name;
      participantsSelect.appendChild(option);
    });
  } catch (error) {
    showMessage('Erreur lors du chargement des joueurs', 'error');
  }
}

async function loadTournoi() {
  if (!tournoiId) {
    showMessage('ID du tournoi manquant', 'error');
    return;
  }

  try {
    const tournoi = await tournoisService.getById(tournoiId);
    document.getElementById('id').value = tournoi._id;
    document.getElementById('name').value = tournoi.name;
    
    const date = new Date(tournoi.date);
    const dateString = date.toISOString().split('T')[0];
    document.getElementById('date').value = dateString;
    
    document.getElementById('lieu').value = tournoi.lieu;
    document.getElementById('prize_money').value = tournoi.prize_money;
    
    await loadJoueurs();
    
    if (tournoi.participants && tournoi.participants.length > 0) {
      const participantsSelect = document.getElementById('participants');
      tournoi.participants.forEach(participant => {
        const participantId = typeof participant === 'object' ? participant._id : participant;
        const option = participantsSelect.querySelector(`option[value="${participantId}"]`);
        if (option) {
          option.selected = true;
        }
      });
    }
  } catch (error) {
    showMessage('Erreur lors du chargement du tournoi : ' + error.message, 'error');
  }
}

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  validator.clearErrors();
  
  if (!validator.validate()) {
    validator.displayErrors();
    showMessage('Veuillez corriger les erreurs du formulaire', 'error');
    return;
  }

  const formData = new FormData(editForm);
  const selectedParticipants = Array.from(document.getElementById('participants').selectedOptions).map(option => option.value);
  
  const data = {
    name: formData.get('name'),
    date: formData.get('date'),
    lieu: formData.get('lieu'),
    prize_money: parseFloat(formData.get('prize_money')),
    participants: selectedParticipants
  };

  try {
    await tournoisService.update(tournoiId, data);
    showMessage('Tournoi modifié avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-tournois.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la modification : ' + error.message, 'error');
  }
});

loadTournoi();

