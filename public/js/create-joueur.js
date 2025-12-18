import { JoueurService } from './services/joueurService.js';
import { ClubService } from './services/clubService.js';
import { ChampionnatService } from './services/championnatService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage } from './modules/utils.js';

const createForm = document.getElementById('create-form');
const messageContainer = document.getElementById('message-container');
const joueurService = new JoueurService();
const clubService = new ClubService();
const validator = new FormValidator(createForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('classement', Rules.required);
validator.addRule('age', Rules.required);

async function loadClubs() {
  try {
    const clubs = await clubService.getAll();
    const clubSelect = document.getElementById('club');
    clubSelect.innerHTML = '<option value="">Sélectionner un club</option>';
    
    clubs.forEach(club => {
      const option = document.createElement('option');
      option.value = club._id;
      option.textContent = club.name;
      clubSelect.appendChild(option);
    });
  } catch (error) {
    showMessage('Erreur lors du chargement des clubs', 'error');
  }
}

async function loadChampionnats() {
  try {
    const championnatService = new ChampionnatService();
    const championnats = await championnatService.getAll();
    const champSelect = document.getElementById('championnat_equipe');
    champSelect.innerHTML = '<option value="">Sélectionner un championnat</option>';
    
    championnats.forEach(champ => {
      const option = document.createElement('option');
      option.value = champ._id;
      const clubName = champ.club && typeof champ.club === 'object' ? champ.club.name : '';
      option.textContent = `${champ.name} - ${clubName}`;
      champSelect.appendChild(option);
    });
  } catch (error) {
    showMessage('Erreur lors du chargement des championnats', 'error');
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
  const data = {
    name: formData.get('name'),
    classement: formData.get('classement'),
    age: parseInt(formData.get('age')),
    club: formData.get('club'),
    championnat_equipe: formData.get('championnat_equipe')
  };

  try {
    await joueurService.create(data);
    showMessage('Joueur créé avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-joueurs.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la création : ' + error.message, 'error');
  }
});

loadClubs();
loadChampionnats();

