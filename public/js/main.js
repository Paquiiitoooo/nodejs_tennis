const pageSelector = document.getElementById('page-selector');

if (pageSelector) {
  pageSelector.addEventListener('change', function() {
    const selectedPage = this.value;
    if (selectedPage) {
      window.location.href = selectedPage;
    }
  });
}

