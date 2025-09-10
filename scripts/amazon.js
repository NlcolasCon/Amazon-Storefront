import {cart, addToCart} from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';

async function loadPage(){
    try{
        await loadProductsFetch();
    }
    catch(error){
        console.log('Unexpected error. Please try again later.');
    }
    generateItem();
    updateCartQuantity();
}

loadPage();

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     generateItem();
//     updateCartQuantity();
// });

function generateItem(){
    const container = document.querySelector(".js-products-grid");
    let script = "";
    products.forEach((product) => {
        script += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                        src=${product.image}>
                </div>
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                        src="${product.getStartsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>
                <div class="product-price">
                    ${product.getPrice()}
                </div>
                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>
                ${product.extraInfoHTML()}
                <div class="   "></div>
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>`;
    });
    container.innerHTML = script;

    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        const productId = button.dataset.productId;
        button.addEventListener('click', () => {
            addToCart(productId);
            updateCartQuantity();
        });
    });  
}
function updateCartQuantity(){
    let quantity = 0;
    cart.forEach((item) => {
        quantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = quantity;
}