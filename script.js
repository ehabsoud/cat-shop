const apiUrl = "https://api.thecatapi.com/v1/breeds?limit=30"
const catContainer = document.getElementById("cat-container")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const pageInfo = document.getElementById("page-info")
const loadingMessage = document.getElementById("loading-message")
const pagination = document.getElementById("pagination")

let currentPage = 1
const catsPerPage = 10

async function fetchCats() {
    const response = await fetch(apiUrl)
    const cats = await response.json()

    const startIndex = (currentPage - 1) * catsPerPage
    const endIndex = startIndex + catsPerPage
    const paginatedCats = cats.slice(startIndex, endIndex) 
     
    console.log(cats)

    catContainer.innerHTML = ""

    const totalPages = Math.ceil(cats.length / catsPerPage)
    pageInfo.textContent = `Sida ${currentPage} av ${totalPages}`   

    loadingMessage.style.display = "none"
    pagination.hidden = false

    paginatedCats.forEach(cat => {
        const imageUrl = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`

        catContainer.innerHTML += `
            <div class="cat-card">
                <img src="${imageUrl}" alt="${cat.name}">
                <h2>${cat.name}</h2>
                <p>${cat.origin}</p>
            </div>
        `
    })
}

fetchCats();

nextBtn.addEventListener("click", async () => {
    const response = await fetch(apiUrl)
    const cats = await response.json()

    const totalPages = Math.ceil(cats.length / catsPerPage)

    if (currentPage < totalPages) {
        currentPage++
        fetchCats()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
})

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--
        fetchCats()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
})