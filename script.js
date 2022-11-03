function logar(event) {
  event.preventDefault();

  const data = {
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
        document.getElementById("content-API").classList.add("visible");
      } else {
        document.getElementById("erro-login").classList.add("visible");
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
}

function fechaLogin() {
  document.getElementById("modal-login").classList.remove("visible");
}

function deslogar() {
  localStorage.removeItem("token");
  window.location.reload();
}

function pesquisar(event) {
  event.preventDefault();

  const name = this.document.getElementById("input-search").value;
  const requestName =
    "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + name;
  const cardTemplate = document.querySelector("[card-template]");
  const cardContainer = document.querySelector("[content-card]");
  const data = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "184021a6acmsh35a297e24f4750bp131fd2jsn47732ad2c6a3",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };

  cardContainer.innerHTML = "";

  fetch(requestName, data)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((element) => {
        if (element.img != null) {
          document.getElementById("card-not-found").classList.remove("visible");
          const card = cardTemplate.content.cloneNode(true).children[0];
          const cardImage = card.querySelector("[card-image]");
          cardImage.src = element.img;
          cardContainer.append(card);
        }
      });
    })
    .catch((err) => {
      document.getElementById("card-not-found").classList.add("visible");
    });
}
