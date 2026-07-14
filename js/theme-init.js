(function initPortfolioExperience(){
  try {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'blue';
    const savedDepth = localStorage.getItem('portfolio-depth') || 'simple';
    document.documentElement.setAttribute('data-theme', savedTheme === 'green' ? 'green' : 'blue');
    document.documentElement.setAttribute('data-depth', savedDepth === 'technical' ? 'technical' : 'simple');
  } catch (error) {
    document.documentElement.setAttribute('data-theme', 'blue');
    document.documentElement.setAttribute('data-depth', 'simple');
  }

  if (!document.querySelector('link[href="/css/experience.css"]')) {
    const experienceStyles = document.createElement('link');
    experienceStyles.rel = 'stylesheet';
    experienceStyles.href = '/css/experience.css';
    document.head.appendChild(experienceStyles);
  }
})();
