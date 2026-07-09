(function initPortfolioTheme(){
  try {
    const saved = localStorage.getItem('portfolio-theme') || 'blue';
    document.documentElement.setAttribute('data-theme', saved === 'green' ? 'green' : 'blue');
  } catch (error) {
    document.documentElement.setAttribute('data-theme', 'blue');
  }
})();
