function logar(event) {
  event.preventDefault();

  const data = {
    // email: "eve.holt@reqres.in",
    // password: "rafael123"
    email: this.document.getElementById("input-email").value,
    password: this.document.getElementById("input-password").value,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (!data.error) {
        localStorage.setItem("token", data.token);
        document.getElementById("modal-login").classList.remove("visible");
        document.getElementById("button-login").classList.remove("visible");
        document.getElementById("button-logout").classList.add("visible");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

if (localStorage.getItem("token") != null) {
  document.getElementById("button-login").classList.remove("visible");
  document.getElementById("button-logout").classList.add("visible");
}

function abreLogin() {
  document.getElementById("modal-login").classList.add("visible");
}

function fechaLogin() {
  document.getElementById("modal-login").classList.remove("visible");
}

function deslogar() {
  localStorage.removeItem("token");
  window.location.reload();
}
