import { ChampionnatService } from './services/championnatService.js';
import { ClubService } from './services/clubService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage } from './modules/utils.js';

const createForm = document.getElementById('create-form');
const messageContainer = document.getElementById('message-container');
const championnatService = new ChampionnatService();
const clubService = new ClubService();
const validator = new FormValidator(createForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('division', Rules.required);
validator.addRule('saison', Rules.required);

async function loadClubs() {
  try {
    const clubs = await clubService.getAll();
    const clubsSelect = document.getElementById('clubs');
    clubsSelect.innerHTML = '';
    
    clubs.forEach(club => {
      const option = document.createElement('option');
      option.value = club._id;
      option.textContent = club.name;
      clubsSelect.appendChild(option);
    });
  } catch (error) {
    showMessage('Erreur lors du chargement des clubs', 'error');
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
  const selectedClubs = Array.from(document.getElementById('clubs').selectedOptions).map(option => option.value);
  
  if (selectedClubs.length === 0) {
    showMessage('Veuillez sélectionner au moins un club', 'error');
    return;
  }

  const data = {
    name: formData.get('name'),
    division: formData.get('division'),
    saison: formData.get('saison'),
    clubs: selectedClubs
  };

  try {
    await championnatService.create(data);
    showMessage('Championnat créé avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-championnat.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la création : ' + error.message, 'error');
  }
});

loadClubs();

