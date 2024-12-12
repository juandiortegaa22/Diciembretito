document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const diceRollerAppSection = document.getElementById("diceRollerAppSection");
  
    // Inicializar secciones
    const showSection = (section) => {
      [loginSection, registerSection, diceRollerAppSection].forEach((sec) => {
        sec.style.display = sec === section ? "block" : "none";
      });
    };
  
    showSection(loginSection); // Mostrar login inicialmente
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = localStorage.getItem("currentUser");
  
    const logoutUser = () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("sessionExpiry");
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      showSection(loginSection);
    };
  
    const checkSession = () => {
      const sessionExpiry = localStorage.getItem("sessionExpiry");
      if (sessionExpiry && Date.now() > parseInt(sessionExpiry, 10)) {
        logoutUser();
      }
    };
  
    if (currentUser) {
      checkSession();
      showSection(diceRollerAppSection);
      document.getElementById("welcomeMessage").textContent = `¡Bienvenido, ${currentUser}!`;
    }
  
    // Login
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
  
      const user = users.find((u) => u.username === username && u.password === password);
  
      if (user) {
        localStorage.setItem("currentUser", username);
        localStorage.setItem("sessionExpiry", Date.now() + 10 * 60 * 1000);
        showSection(diceRollerAppSection);
        document.getElementById("welcomeMessage").textContent = `¡Bienvenido, ${username}!`;
      } else {
        document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos.";
        document.getElementById("loginError").style.display = "block";
      }
    });
  
    // Registro
    document.getElementById("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();
  
      if (!username || !password || password !== confirmPassword) {
        document.getElementById("registerError").textContent = "Verifica los datos ingresados.";
        document.getElementById("registerError").style.display = "block";
        return;
      }
  
      if (users.some((u) => u.username === username)) {
        document.getElementById("registerError").textContent = "El usuario ya existe.";
        document.getElementById("registerError").style.display = "block";
        return;
      }
  
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      showSection(loginSection);
    });
  
    // Lanzar Dado
    const rollDiceButton = document.getElementById("rollDiceButton");
    const diceImage = document.getElementById("diceImage");
    const diceTotalElement = document.getElementById("diceTotal");
    let diceTotal = 0;
  
    diceImage.src = "<box-icon type='solid' name='dice-1'></box-icon>"; // Mostrar la cara 1 por defecto
  
    rollDiceButton.addEventListener("click", () => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      diceImage.src = `./img/dados/bx-dice-${diceRoll}.svg`;
      diceTotal += diceRoll;
      diceTotalElement.textContent = `Total acumulado: ${diceTotal}`;
    });
  
    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      logoutUser();
    });
  
    // Volver a Login
    document.getElementById("backToLogin").addEventListener("click", () => {
      showSection(loginSection);
    });
  
    // Ir a Registro
    document.getElementById("createAccount").addEventListener("click", () => {
      showSection(registerSection);
    });
  });
  