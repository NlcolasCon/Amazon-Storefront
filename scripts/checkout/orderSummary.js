import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { generateSummary } from "./paymentSummary.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function generateCart(){
    let script = '';
    cart.forEach((item) => {

        let match;
        products.forEach((product) => {
            if(product.id === item.productId){
                match = product;
            }
        });

        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if(option.deliveryId === item.deliveryOptionId){
                deliveryOption = option;
            }
        });
        const currentDate = dayjs().add(deliveryOption.deliveryDay, 'day').format('dddd, MMMM D');

        script +=  `<div class="cart-item-container js-cart-item-container-${match.id}">
                        <div class="delivery-date">
                            Delivery date: ${currentDate}
                        </div>

                        <div class="cart-item-details-grid">
                            <img class="product-image"
                                src=${match.image}>

                            <div class="cart-item-details">
                                <div class="product-name">
                                    ${match.name}
                                </div>
                                <div class="product-price">
                                    ${match.getPrice()}
                                </div>
                                <div class="product-quantity">
                                    <span>
                                        Quantity: <span class="quantity-label">${item.quantity}</span>
                                    </span>
                                    <span class="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${match.id}" >
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div class="delivery-options">
                                <div class="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                ${generateDeliveryOptions(item, match)}
                            </div>
                        </div>
                    </div>`
    });
    document.querySelector(".js-order-summary").innerHTML= script;
    document.querySelectorAll(".js-delete-quantity-link").forEach((deleteButton) => {
        deleteEvent(deleteButton);
    });
    document.querySelectorAll(".js-delivery-option").forEach((deliveryButton) =>{
        deliveryEvent(deliveryButton);
    });
}

function generateDeliveryOptions(item, product){
    let script = '';

    deliveryOptions.forEach((deliveryOption) => {
        const currentDate = dayjs().add(deliveryOption.deliveryDay, 'day').format('dddd, MMMM D');
        const priceString = deliveryOption.deliveryPriceCents === 0 ? 'FREE' : 
        `$${formatCurrency(deliveryOption.deliveryPriceCents)}`;
        const isChecked = (item.deliveryOptionId === deliveryOption.deliveryId);

        script +=  `
            <label class="delivery-option js-delivery-option" data-delivery-price="${priceString}"
                data-product-id="${product.id}"
                data-delivery-id="${deliveryOption.deliveryId}">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input js-delivery-option-input" name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                        ${currentDate}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString}
                    </div>
                </div>
            </label>
            `;
        });
    return script;
}

function deleteEvent(deleteButton){
    deleteButton.addEventListener('click', () => {
            const productId = deleteButton.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            generateCart();
            generateSummary();
    });
}

function deliveryEvent(deliveryButton){
    deliveryButton.addEventListener('click', () => {
        const productID = deliveryButton.dataset.productId
        const deliveryID = deliveryButton.dataset.deliveryId
        updateDeliveryOption(productID, deliveryID);
        generateCart();
        generateSummary();
    });
}