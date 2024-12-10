### Sistema de Login y Registro con Modo Oscuro

Este proyecto es una aplicación web sencilla que permite a los usuarios registrarse, iniciar sesión y cambiar entre **modo claro** y **modo oscuro**. Utiliza `localStorage` como base de datos simulada para gestionar datos.



### Funcionalidades

1. Login:
   - Inicia sesión validando usuario y contraseña almacenados en `localStorage`.
   - Redirige a una página de error (`404`) al iniciar sesión correctamente.
   - Incluye un enlace a la pantalla de registro y un botón para alternar entre modos claro y oscuro.

2. Registro:
   - Crea cuentas con usuario y contraseña (confirmada).
   - Valida que:
     - Los campos no estén vacíos.
     - Las contraseñas coincidan.
     - El nombre de usuario no esté repetido.
   - Almacena los datos en `localStorage`.

3. Pantalla de Error (404):
   - Muestra un mensaje simulando una sección no disponible.
   - Incluye un botón para volver al login.

4. Modo Oscuro:
   - Permite alternar entre temas claro y oscuro.
   - Guarda la preferencia en `localStorage` para mantenerla al recargar.



### Tecnologías

- HTML: Estructura de las páginas.
- CSS: Estilo visual.
- Bootstrap: Diseño para celular.
- Bootstrap Icons: Iconos para la interfaz.
- JavaScript: Lógica y validaciones.



### Validaciones

- Registro:
  - Campos obligatorios.
  - Contraseñas iguales.
  - Usuario único.
- Login:
  - Usuario y contraseña correctos según los datos registrados.

### Cambios realizados
Agregué funcionalidad para que la sesión dure 10 minutos después de iniciar sesión exitosamente.

- Sesión con tiempo limitado: Se guarda en `localStorage` el usuario actual y el tiempo de expiración.
- Temporizador: Uso de `setTimeout` para eliminar la sesión y redirigir al login con un mensaje al expirar.


