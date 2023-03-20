

document.querySelector("form").addEventListener("submit", function(event) {
    let nombre = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    sessionStorage.setItem("username", nombre);
    sessionStorage.setItem("password", password);
  });

  document.getElementById("recordarcontraseña").addEventListener("click", viewPassword);

  function viewPassword() {
    let password = sessionStorage.getItem("password");
    if (password) {
      alert("La contraseña almacenada es: " + password);
    } else {
      alert("No hay contraseña almacenada");
    }
  }