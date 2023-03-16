let emailInput = document.getElementById('email');
let emailRegex =  /^[A-Z0-9. _%+-]+@[A-Z0-9.-]+\.[ A-Z]{2,}$/;

if (!emailRegex.test(emailInput.value)) {
}

document.querySelector("form").addEventListener("submit", function(event) {
    let nombre = document.getElementById("username").value;
    let mail = document.getElementById("email").value;
    sessionStorage.setItem("username", nombre);
    sessionStorage.setItem("email", mail);
  });


