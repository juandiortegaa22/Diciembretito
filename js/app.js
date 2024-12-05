document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const notFoundSection = document.getElementById("notFoundSection");
  
    // Inicializar secciones
    const showSection = (section) => {
      [loginSection, registerSection, notFoundSection].forEach((sec) => {
        sec.style.display = sec === section ? "block" : "none";
      });
    };
  
    showSection(loginSection); // Mostrar login inicialmente
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = localStorage.getItem("currentUser");
  
    if (currentUser) {
      showSection(notFoundSection);
    }
  
    // Login
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      loginError.style.display = "none";
  
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
  
      const user = users.find((u) => u.username === username && u.password === password);
  
      if (user) {
        localStorage.setItem("currentUser", username);
        showSection(notFoundSection);
      } else {
        loginError.textContent = "Usuario o contraseña incorrectos.";
        loginError.style.display = "block";
      }
    });
  
    // Ir a registro
    document.getElementById("createAccount").addEventListener("click", () => {
      showSection(registerSection);
    });
  
    // Registro
    const registerForm = document.getElementById("registerForm");
    const registerError = document.getElementById("registerError");
  
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      registerError.style.display = "none";
  
      const username = document.getElementById("registerUsername").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();
  
      if (!username || !password || password !== confirmPassword) {
        registerError.textContent = "Verifica los datos ingresados.";
        registerError.style.display = "block";
        return;
      }
  
      if (users.some((u) => u.username === username)) {
        registerError.textContent = "El usuario ya existe.";
        registerError.style.display = "block";
        return;
      }
  
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      showSection(loginSection);
    });
  
    // Volver al login desde registro
    document.getElementById("backToLogin").addEventListener("click", () => {
      showSection(loginSection);
    });
  
    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      showSection(loginSection);
    });
  });
  