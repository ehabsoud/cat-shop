const apiUrl = "https://api.thecatapi.com/v1/breeds?limit=30"
const catContainer = document.getElementById("cat-container")

async function fetchCats() {
    const response = await fetch(apiUrl)
    const cats = await response.json()
     
    console.log(cats)

    cats.forEach(cat => {
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