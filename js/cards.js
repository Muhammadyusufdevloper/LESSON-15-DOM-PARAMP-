const API_URL = "https://fakestoreapi.com";
const wrapperCards = document.querySelector(".prodacts__wrapper-cards");
const prodactsSeeMoreBtn = document.querySelector(".prodacts__see-more-btn");
const lodaing = document.querySelector(".prodacts__lodaing__boxs");
const prodactsTitleSpan = document.querySelector(".prodacts__title__span");

let limitCount = 4;
let count = 1;

async function fatchProdacts(URL) {
  let data = await fetch(`${URL}/products?limit=${limitCount * count}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapCard(res))
    .catch((error) => console.log(error))
    .finally(() => {
      prodactsSeeMoreBtn.innerHTML = "See more";
      prodactsSeeMoreBtn.removeAttribute("disabled");
      lodaing.style.display = "none";
    });
}
fatchProdacts(API_URL);
prodactsTitleSpan.innerHTML = `(${API_URL.length-limitCount})`;

function mapCard(cardData) {
  let card = "";
  cardData.forEach((products) => {
    card += `
        <div class="prodacts__card">
            <div class="prodacts__img-box">
                <img class="img-box" data-id="${products.id}" src=${products.image} alt="${products.title}" />
              </div>
              <div class="prodacts__datum">
                <div class="prodacts__datum__part">
                  <img src="./assets/image/yuldiz.svg" alt="yuldiz" />
                  <p class="prodacts__datum__desc">(12) отзывов</p>
                </div>
                <h3 class="prodacts__datum__title">
                ${products.title}
                </h3>
                <div class="prodacts__datum__part">
                  <p class="prodacts__datum__text">${products.price}₽</p>
                  <span class="prodacts__datum__span">12 000₽</span>
                </div>
               
            </div>
        </div>
        `;
  });
  wrapperCards.innerHTML = card;
}

prodactsSeeMoreBtn.addEventListener("click", () => {
  count++;
  fatchProdacts(API_URL);
  prodactsSeeMoreBtn.innerHTML = "Loading....";
  prodactsSeeMoreBtn.setAttribute("disabled", true);
});
function mapLoading(lodaingData) {
  let lodingCard = "";
  for (let i = 0; i < lodaingData; i++) {
    lodingCard += `
        <div class="prodacts__lodaing__cards">
            <div class="prodacts__lodaing__card-img loading-anime">
            </div>
            <div class="prodacts__lodaing__card-info">
                <div class="prodacts__lodaing__card-text loading-anime"></div>
                <div class="prodacts__lodaing__card-text loading-anime"></div>
                <div class="prodacts__lodaing__card-text loading-anime"></div>
            </div>
        </div>  
        `;
  }
  lodaing.innerHTML = lodingCard;
}
mapLoading(limitCount * count);

wrapperCards.addEventListener("click", (e)=>{
    if (e.target.className === "img-box") {
        let id = e.target.dataset.id
        window.open(`./pages/products.html?id=${id}`, "_self")
    }
})