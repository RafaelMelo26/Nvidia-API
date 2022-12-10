const urlbackend = "https://nvidiabackend.onrender.com/";

function logar(event) {
  event.preventDefault();

  const data = {
    email: this.document.getElementById("input-email").value,
    password: this.document.getElementById("input-password").value,
  };

  fetch(urlbackend + "authLogin/login", {
    method: "POST",
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
        window.location.reload();
      } else {
        document.getElementById("erro-login").classList.add("visible");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cadastrar(event) {
  event.preventDefault();

  const data = {
    email: this.document.getElementById("input-email-register").value,
    password: this.document.getElementById("input-password-register").value,
  };

  fetch(urlbackend + "authLogin/cadastro", {
    method: "POST",
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
        window.location.reload();
      } else {
        document.getElementById("erro-register").classList.add("visible");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

if (localStorage.getItem("token") != null) {
  document.getElementById("button-login").classList.remove("visible");
  document.getElementById("button-logout").classList.add("visible");
  document.getElementById("content-API").classList.add("visible");
}

function abreLogin() {
  document.getElementById("modal-login").classList.add("visible");
  document.body.classList.add("blockScroll");
}

function fechaLogin() {
  document.getElementById("modal-login").classList.remove("visible");
  document.body.classList.remove("blockScroll");
}

function abreRegistro() {
  document.getElementById("modal-register").classList.add("visible");
  document.body.classList.add("blockScroll");
}

function fechaRegistro() {
  document.getElementById("modal-register").classList.remove("visible");
  document.body.classList.remove("blockScroll");
}

function abreAdmin() {
  document.getElementById("modal-admin").classList.add("visible");
  document.body.classList.add("blockScroll");
}

function fechaAdmin() {
  document.getElementById("modal-admin").classList.remove("visible");
  document.body.classList.remove("blockScroll");
}

function deslogar() {
  localStorage.removeItem("token");
  window.location.reload();
}

function salvar(event) {
  event.preventDefault();
  document.getElementById("aguarde-admin").classList.add("visible");

  const data = {
    name: this.document.getElementById("input-name-admin").value,
    url: this.document.getElementById("input-file-admin").files[0],
  };

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("url", data.url);

  fetch(urlbackend + "images", {
    method: "POST",
    headers: {
      token: window.localStorage.getItem("token"),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (!data.error) {
        window.location.reload();
      } else {
        document.getElementById("erro-admin").classList.add("visible");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function pesquisar(event) {
  event.preventDefault();

  const name = this.document.getElementById("input-search").value;
  const requestName = urlbackend + "images/?name=" + name;
  const cardTemplate = document.querySelector("[card-template]");
  const cardContainer = document.querySelector("[content-card]");
  const data = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "184021a6acmsh35a297e24f4750bp131fd2jsn47732ad2c6a3",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      token: localStorage.getItem("token"),
    },
  };

  cardContainer.innerHTML = "";

  fetch(requestName, data)
    .then((response) => response.json())
    .then((response) => {
      if (response.length == 0) {
        document.getElementById("card-not-found").classList.add("visible");
      } else {
        response.forEach((element) => {
          if (element.url != null) {
            document
              .getElementById("card-not-found")
              .classList.remove("visible");
            const card = cardTemplate.content.cloneNode(true).children[0];
            const cardImage = card.querySelector("[card-image]");
            cardImage.src = element.url;
            cardContainer.append(card);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
