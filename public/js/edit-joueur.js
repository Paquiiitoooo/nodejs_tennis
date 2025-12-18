import { JoueurService } from './services/joueurService.js';
import { ClubService } from './services/clubService.js';
import { ChampionnatService } from './services/championnatService.js';
import { FormValidator, Rules } from './classes/formValidator.js';
import { showMessage, getUrlParameter } from './modules/utils.js';

const editForm = document.getElementById('edit-form');
const messageContainer = document.getElementById('message-container');
const joueurService = new JoueurService();
const clubService = new ClubService();
const validator = new FormValidator(editForm);

validator.addRule('name', Rules.required);
validator.addRule('name', Rules.minLength(2));
validator.addRule('classement', Rules.required);
validator.addRule('age', Rules.required);

const joueurId = getUrlParameter('id');

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

async function loadJoueur() {
  if (!joueurId) {
    showMessage('ID du joueur manquant', 'error');
    return;
  }

  try {
    const joueur = await joueurService.getById(joueurId);
    document.getElementById('id').value = joueur._id;
    document.getElementById('name').value = joueur.name;
    document.getElementById('classement').value = joueur.classement;
    document.getElementById('age').value = joueur.age;
    
    await loadClubs();
    await loadChampionnats();
    
    if (joueur.club && typeof joueur.club === 'object') {
      document.getElementById('club').value = joueur.club._id;
    } else {
      document.getElementById('club').value = joueur.club;
    }
    
    if (joueur.championnat_equipe && typeof joueur.championnat_equipe === 'object') {
      document.getElementById('championnat_equipe').value = joueur.championnat_equipe._id;
    } else {
      document.getElementById('championnat_equipe').value = joueur.championnat_equipe;
    }
  } catch (error) {
    showMessage('Erreur lors du chargement du joueur : ' + error.message, 'error');
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
  const data = {
    name: formData.get('name'),
    classement: formData.get('classement'),
    age: parseInt(formData.get('age')),
    club: formData.get('club'),
    championnat_equipe: formData.get('championnat_equipe')
  };

  try {
    await joueurService.update(joueurId, data);
    showMessage('Joueur modifié avec succès !', 'success');
    setTimeout(() => {
      window.location.href = 'liste-joueurs.html';
    }, 1500);
  } catch (error) {
    showMessage('Erreur lors de la modification : ' + error.message, 'error');
  }
});

loadJoueur();

