const apiKey = "fmpk1y9oq5soBB6RI8HjosKouXXf74ApKIVxBN5lgoHXGoItqFuh65hs";

// prelevo i parametri dalla url quando l'utente torna dalla pagina details
const addressBarContent = new URLSearchParams(location.search);
const imageID = addressBarContent.get("id");
const query = addressBarContent.get("query");
const url = "https://api.pexels.com/v1/";

// fetch a partire dall'id
const getImageDetails = () => {
  fetch(url + "photos/" + imageID, {
    headers: { Authorization: apiKey }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella risposta");
      }
    })
    .then((imageDetails) => {
      console.log(imageDetails);
      showImageDetails(imageDetails);
    })
    .catch((err) => {
      console.log(err);
    });
};

getImageDetails();

// mostro i dettagli dell'immagine
const showImageDetails = (details) => {
  // accedo al contenitore
  const imageDetails = document.getElementById("imageDetails");
  imageDetails.classList.add("py-5");
  // creo colonna per l'immagine
  const imgCol = document.createElement("div");
  imgCol.classList.add("col-8", "mx-auto");
  imgCol.innerHTML = `
  <img class="w-100 mb-3" src="${details.src.large}" alt="${details.alt}"/>`;
  // creo colonna per i dettagli
  imageDetails.appendChild(imgCol);
  const detailsCol = document.createElement("div");
  detailsCol.classList.add("col-12", "text-center");
  detailsCol.innerHTML = `
  <h1>${details.alt}</h1>
  <h5 class="mb-5">Photographer: <a class="text-decoration-none text-success" href="${details.photographer_url}">${details.photographer}</h5></a>
  <a class="text-decoration-none text-secondary" href="./?query=${query}">Back to research result</a>`; // pulsante che ritorna alla pagina di ricerca passando la chiave di ricerca
  imageDetails.appendChild(detailsCol);
};
