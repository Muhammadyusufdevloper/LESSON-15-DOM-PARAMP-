const API_URL = "https://fakestoreapi.com";
const parampWrapper = document.querySelector(".paramp__wrapper")
const loading = document.querySelector(".paramp__loading")

async function fetchCard(api) {
    let param = new URLSearchParams(location.search)
    let id = param.get("id")
    let data = await fetch(`${api}/products/${id}`,{
        method:"GET"
    })
    data
        .json()
        .then(res => mapCard(res))
        .catch(err => console.log(err))
        .finally(()=>{
            loading.style.display = "none";
        })
}
fetchCard(API_URL)

function mapCard(cardData) {
    parampWrapper.innerHTML =`
        <div class="paramp__img-card">
            <img src=${cardData.image} alt="${cardData.title}">
        </div>
        <div class="paramp__info">
            <h3 class="paramp__title">${cardData.title}</h3>
            <p class="paramp__desc">${cardData.description}</p>
            <p class="paramp__desc"><span>Category: </span>${cardData.category}</p>
            <p class="paramp__desc"><span>Rating: </span>${cardData.rating.rate +" " + cardData.rating.count}</p>
            <div class="paramp__info__card">
                <p class="paramp__info__desc">${cardData.price}₽</p>
                <span class="prodacts__datum__span">12 000₽</span>
            </div>
            <button class="paramp__btn">КОРЗИНКА</button>
        </div>
        
        `
}