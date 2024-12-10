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
  const sessionKey = "currentUserSession";

  const checkSession = () => {
      const session = JSON.parse(localStorage.getItem(sessionKey));
      if (session) {
          const { username, expiresAt } = session;
          const now = new Date().getTime();
          if (now < expiresAt) {
              // Sesión válida
              setSessionTimeout(expiresAt - now);
              return username;
          }
      }
      // Si no hay sesión válida, limpiamos y mostramos login
      localStorage.removeItem(sessionKey);
      showSection(loginSection);
      return null;
  };

  const setSessionTimeout = (timeLeft) => {
      setTimeout(() => {
          localStorage.removeItem(sessionKey);
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          showSection(loginSection);
      }, timeLeft);
  };

  const currentUser = checkSession();
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
          const sessionDuration = 10 * 60 * 1000; // 10 minutos en milisegundos
          const expiresAt = new Date().getTime() + sessionDuration;

          localStorage.setItem(
              sessionKey,
              JSON.stringify({ username, expiresAt })
          );
          setSessionTimeout(sessionDuration);
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
      localStorage.removeItem(sessionKey);
      showSection(loginSection);
  });
});
