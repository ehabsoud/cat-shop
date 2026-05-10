const apiUrl = "https://api.thecatapi.com/v1/breeds?limit=30"
const catContainer = document.getElementById("cat-container")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const pageInfo = document.getElementById("page-info")
const loadingMessage = document.getElementById("loading-message")
const pagination = document.getElementById("pagination")
const searchInput = document.getElementById("search-input")

let currentPage = 1
let allCats = []
let filteredCats = []
let cart = JSON.parse(localStorage.getItem("cart")) || []
const catsPerPage = 10

async function fetchCats() {
    const response = await fetch(apiUrl)
    const cats = await response.json()

    allCats = cats
    filteredCats = cats
    renderCats()
}

function renderCats() {

    const startIndex = (currentPage - 1) * catsPerPage
    const endIndex = startIndex + catsPerPage
    const paginatedCats = filteredCats.slice(startIndex, endIndex) 
     
    console.log(filteredCats)

    catContainer.innerHTML = ""

    if (filteredCats.length === 0) {
        catContainer.innerHTML = "<p>Inga katter hittades.</p>"
        pageInfo.textContent = ""
        pagination.hidden = true
        return
    }

    const totalPages = Math.ceil(filteredCats.length / catsPerPage)
    pageInfo.textContent = `Sida ${currentPage} av ${totalPages}`   

    loadingMessage.style.display = "none"
    pagination.hidden = false

    paginatedCats.forEach(cat => {
        const imageUrl = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`

    catContainer.innerHTML += `
        <div class="cat-card">
            <img src="${imageUrl}" alt="${cat.name}">

            <div class="cat-info">
                <h2>${cat.name}</h2>
                <p>${cat.origin}</p>
            </div>

            <button class="add-to-cart-btn" data-id="${cat.id}">
                Lägg till i kundvagn
            </button>
        </div>
    `
    })

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const catId = button.dataset.id

            const selectedCat = allCats.find(cat => cat.id === catId)

            cart.push(selectedCat)

            localStorage.setItem("cart", JSON.stringify(cart))

            button.textContent = "Tillagd ✓"
            setTimeout(() => {
                button.textContent = "Lägg till i kundvagn"
            }, 1200)

            console.log(cart)
        })
    })
}

fetchCats();

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredCats.length / catsPerPage)

    if (currentPage < totalPages) {
        currentPage++
        renderCats()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
})

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--
        renderCats()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
})

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase()

    filteredCats = allCats.filter(cat =>
        cat.name.toLowerCase().includes(searchValue)
    )
    currentPage = 1
    renderCats()
})