const apiKey = "fmpk1y9oq5soBB6RI8HjosKouXXf74ApKIVxBN5lgoHXGoItqFuh65hs";

const url = "https://api.pexels.com/v1/search?query=";

const addressBarContent = new URLSearchParams(location.search);
const query = addressBarContent.get("query");

const getImages = (value) => {
  fetch(url + value, {
    headers: { Authorization: apiKey }
  })
    .then((images) => {
      if (images.ok) {
        return images.json();
      } else {
        throw new Error("Errore nel recupero");
      }
    })
    .then((data) => {
      const imagesArray = [];
      imagesArray.push(...data.photos);
      // manipolo il DOM
      const wrapper = document.querySelector(".album .row");
      imagesArray.forEach((image, i) => {
        const cards = document.querySelectorAll(".card");
        const cardImg = cards[i].querySelector("img");
        cardImg.style.cursor = "pointer";
        cardImg.src = image.src.medium;
        cardImg.onclick = () => {
          location.href = `./details.html?id=${image.id}&query=${value}`;
        };
        console.dir(cards[i]);
        const title = cards[i].querySelector("h5");
        title.style.cursor = "pointer";
        title.onclick = () => {
          location.href = `./details.html?id=${image.id}&query=${value}`;
        };
        title.innerText = image.alt;
        const btn = cards[i].querySelector(".btn-group > button:nth-of-type(2)");
        btn.innerText = "Hide";
        btn.onclick = () => {
          cards[i].closest(".col-md-4").remove();
        };
        cards[i].querySelector(".text-muted").innerText = "ID: " + image.id;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const primaryBtn = document.querySelector(".btn-primary");
primaryBtn.onclick = (event) => {
  getImages("hamsters");
};

const secondaryBtn = document.querySelector(".btn-secondary");
secondaryBtn.onclick = () => {
  getImages("tigers");
};

const customSearch = document.querySelector("form");
customSearch.onsubmit = (e) => {
  e.preventDefault();
  const value = document.getElementById("keyword").value;
  getImages(value);
};
