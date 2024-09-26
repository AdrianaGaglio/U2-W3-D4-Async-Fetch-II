const apiKey = "fmpk1y9oq5soBB6RI8HjosKouXXf74ApKIVxBN5lgoHXGoItqFuh65hs";

const url = "https://api.pexels.com/v1/search?query=";

const addressBarContent = new URLSearchParams(location.search);
const query = addressBarContent.get("query");

const value = query ? query : "";

const getImages = (value) => {
  document.querySelector(".album").classList.add("d-block");
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
      wrapper.classList.add("g-3");
      imagesArray.forEach((image, i) => {
        const cards = document.querySelectorAll(".card");
        cards[i].classList.add("h-100");
        cards[i].querySelector(".card-body").classList.add("d-flex", "flex-column", "justify-content-between");
        const cardImg = cards[i].querySelector("img");
        cardImg.style.height = "350px";
        cardImg.style.objectFit = "cover";
        cardImg.style.cursor = "pointer";
        cardImg.src = image.src.medium;
        cardImg.onclick = () => {
          location.href = `./details.html?id=${image.id}&query=${value}`;
        };
        const title = cards[i].querySelector("h5");
        title.classList.add("mb-3");
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
        const viewBtns = cards[i].querySelectorAll(".btn-group > button:nth-of-type(1)");
        viewBtns.forEach((btn) => {
          btn.onclick = () => {
            const modal = document.querySelector(".modal-body");
            modal.innerHTML = `<img class="w-100" src="${image.src.large}" alt="${image.alt}"/>`;
          };
        });
        cards[i].querySelector(".text-muted").innerText = "ID: " + image.id;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

if (query) {
  getImages(query);
}

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
