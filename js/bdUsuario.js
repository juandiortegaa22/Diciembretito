document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // IDs de los botones
  const darkModeButtons = [
    document.getElementById("darkModeToggle-login"),
    document.getElementById("darkModeToggle-register"),
    document.getElementById("darkModeToggle-404"),
  ];

  // Verificar el estado de Dark Mode en localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    enableDarkMode();
  }

  // Agregar evento a cada botón
  darkModeButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
          disableDarkMode();
        } else {
          enableDarkMode();
        }
      });
    }
  });

  // Habilitar Dark Mode
  function enableDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    updateButtonsIcon('<i class="bi bi-sun"></i>');
  }

  // Deshabilitar Dark Mode
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    updateButtonsIcon('<i class="bi bi-moon"></i>');
  }

  // Actualizar el ícono de todos los botones
  function updateButtonsIcon(iconHTML) {
    darkModeButtons.forEach((button) => {
      if (button) {
        button.innerHTML = iconHTML;
      }
    });
  }
});
