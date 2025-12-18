document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    const linkFileName = linkPage.split('/').pop();
    
    if (linkFileName === currentPage || 
        (currentPage === '' && linkFileName === 'index.html') ||
        (currentPage === 'index.html' && linkFileName === 'index.html')) {
      link.classList.add('active');
    }
  });
});

