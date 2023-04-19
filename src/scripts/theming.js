const root = document.firstElementChild;
const body = document.body;
const toggler = document.getElementById('theme-toggle');

const toggleTheme = () => {
  // prettier-ignore
  root.style.colorScheme = root.style.colorScheme === 'dark'
    ? 'light'
    : 'dark';

  body.classList.toggle('light');
  body.classList.toggle('dark');
};

window.onload = () => {
  toggler.addEventListener('change', toggleTheme);
  // Remove focus on exit
  toggler.addEventListener('mouseleave', () => toggler.blur());
};

// Keep in sync with potential system config changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    if (isDark) {
      root.style.colorScheme = 'dark';
    }
  });
