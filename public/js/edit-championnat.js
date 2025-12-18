import { ChampionnatService } from './services/championnatService.js';
import { ClubService } from './services/clubService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage, getUrlParameter } from './modules/utils.js';

const editForm = document.getElementById('edit-form');
const messageContainer = document.getElementById('message-container');
const championnatService = new ChampionnatService();
const clubService = new ClubService();
const validator = new FormValidator(editForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('division', Rules.required);
validator.addRule('saison', Rules.required);

const championnatId = getUrlParameter('id');

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

async function loadChampionnat() {
  if (!championnatId) {
    showMessage('ID du championnat manquant', 'error');
    return;
  }

  try {
    const championnat = await championnatService.getById(championnatId);
    document.getElementById('id').value = championnat._id;
    document.getElementById('name').value = championnat.name;
    document.getElementById('division').value = championnat.division;
    document.getElementById('saison').value = championnat.saison;
    
    await loadClubs();
    
    if (championnat.clubs && championnat.clubs.length > 0) {
      const clubsSelect = document.getElementById('clubs');
      championnat.clubs.forEach(club => {
        const clubId = typeof club === 'object' ? club._id : club;
        const option = clubsSelect.querySelector(`option[value="${clubId}"]`);
        if (option) {
          option.selected = true;
        }
      });
    }
  } catch (error) {
    showMessage('Erreur lors du chargement du championnat : ' + error.message, 'error');
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
    await championnatService.update(championnatId, data);
    showMessage('Championnat modifié avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-championnat.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la modification : ' + error.message, 'error');
  }
});

loadChampionnat();

