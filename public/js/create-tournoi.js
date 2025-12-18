import { TournoisService } from './services/tournoisService.js';
import { JoueurService } from './services/joueurService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage } from './modules/utils.js';

const createForm = document.getElementById('create-form');
const messageContainer = document.getElementById('message-container');
const tournoisService = new TournoisService();
const joueurService = new JoueurService();
const validator = new FormValidator(createForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('date', Rules.required);
validator.addRule('lieu', Rules.required);
validator.addRule('prize_money', Rules.required);

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

createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  validator.clearErrors();
  
  if (!validator.validate()) {
    validator.displayErrors();
    showMessage('Veuillez corriger les erreurs du formulaire', 'error');
    return;
  }

  const formData = new FormData(createForm);
  const selectedParticipants = Array.from(document.getElementById('participants').selectedOptions).map(option => option.value);
  
  const data = {
    name: formData.get('name'),
    date: formData.get('date'),
    lieu: formData.get('lieu'),
    prize_money: parseFloat(formData.get('prize_money')),
    participants: selectedParticipants
  };

  try {
    await tournoisService.create(data);
    showMessage('Tournoi créé avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-tournois.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la création : ' + error.message, 'error');
  }
});

loadJoueurs();

