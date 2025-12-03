export function showMessage(message, type = 'success', containerId = 'message-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.className = `message-${type}`;
  container.textContent = message;
  container.style.display = 'block';

  setTimeout(() => {
    container.style.display = 'none';
  }, 5000);
}

export function formatDate(dateString) {
}

export function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération depuis localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression depuis localStorage:', error);
    }
  }
};
