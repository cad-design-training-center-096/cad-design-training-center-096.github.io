window.addEventListener('scroll', function () {
    const body = document.body;
    if (window.scrollY > 2) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
});
  
window.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 989.98) {
    document.body.classList.add('scrolled');
  }
});