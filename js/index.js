const apiKey = "fmpk1y9oq5soBB6RI8HjosKouXXf74ApKIVxBN5lgoHXGoItqFuh65hs";
const url = "https://api.pexels.com/v1/search?query=";

// prelevo i parametri dalla url quando l'utente torna dalla pagina details
const addressBarContent = new URLSearchParams(location.search);
const query = addressBarContent.get("query");

// se la url contiene il parametro query, viene usato quel parametro di ricerca
const value = query ? query : "";

// funzione fetch
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
      // creo un array a partire dai dati ricevuti in risposta

      // imagesArray.push(...data.photos);
      generateImages(data.photos, value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const generateImages = (array, value) => {
  // seleziono il contenitore delle immagini
  const wrapper = document.querySelector(".album .row");
  wrapper.classList.add("g-3");

  // ciclo le immagini
  array.forEach((image, i) => {
    const cards = document.querySelectorAll(".card");
    // seleziono le card

    // gestisco gli stili della card
    cards[i].classList.add("h-100");
    cards[i].querySelector(".card-body").classList.add("d-flex", "flex-column", "justify-content-between");

    // accedo all'immagine e modifico
    const cardImg = cards[i].querySelector("img");
    cardImg.style.cursor = "pointer";
    cardImg.src = image.src.portrait;
    cardImg.onclick = () => {
      location.href = `./details.html?id=${image.id}&query=${value}`;
    };
    // accedo al titolo e modifico
    const title = cards[i].querySelector("h5");
    title.classList.add("mb-3");
    title.style.cursor = "pointer";
    title.onclick = () => {
      location.href = `./details.html?id=${image.id}&query=${value}`;
    };
    title.innerText = image.alt;
    // modifico il testo del secondo bottone della card + funzione per eliminare la card
    const btn = cards[i].querySelector(".btn-group > button:nth-of-type(2)");
    btn.innerText = "Hide";
    btn.onclick = () => {
      cards[i].closest(".col-md-4").remove();
    };

    // accedo al primo bottone e mostro il modale con l'immagine grande
    const viewBtns = cards[i].querySelectorAll(".btn-group > button:nth-of-type(1)");
    viewBtns.forEach((btn) => {
      btn.onclick = () => {
        const modal = document.querySelector(".modal-body");
        modal.innerHTML = `<img class="w-100" src="${image.src.large}" alt="${image.alt}"/>`;
      };
    });
    cards[i].querySelector(".text-muted").innerText = "ID: " + image.id;
  });
};

// se l'url contiene il parametro la fetch viene eseguita con quel parametro
if (query) {
  getImages(query);
}

// fetch con parametro default "hamsters"
const primaryBtn = document.querySelector(".btn-primary");
primaryBtn.onclick = (event) => {
  getImages("hamsters");
};

// fetch con parametro default "tigers"
const secondaryBtn = document.querySelector(".btn-secondary");
secondaryBtn.onclick = () => {
  getImages("tigers");
};

// fetch con chiave di ricerca custom
const customSearch = document.querySelector("form");
customSearch.onsubmit = (e) => {
  e.preventDefault();
  const value = document.getElementById("keyword").value;
  getImages(value);
};
