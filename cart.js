const cartContainer = document.getElementById("cart-container")

const cart = JSON.parse(localStorage.getItem("cart")) || []

console.log(cart)

if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Din kundvagn är tom.</p>"
} else {
    cart.forEach((cat, index) => {
        const imageUrl = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`

        cartContainer.innerHTML += `
            <div class="cat-card cart-card">
                <img src="${imageUrl}" alt="${cat.name}">

                <div class="cart-info">
                    <h2>${cat.name}</h2>
                    <p>${cat.origin}</p>

                    <button class="remove-from-cart-btn" data-index="${index}">
                        Ta bort
                    </button>
                </div>
            </div>
        `
    })
}

const removeButtons = document.querySelectorAll(".remove-from-cart-btn")

removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const index = button.dataset.index

        cart.splice(index, 1)

        localStorage.setItem("cart", JSON.stringify(cart))

        location.reload()
    })
})