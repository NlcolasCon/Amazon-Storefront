import { formatCurrency } from "../utils/money.js";
import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function generateSummary(){
    const costs = getCost();
    let script = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${getQuantity()}):</div>
                <div class="payment-summary-money">$${formatCurrency(costs.cost)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(costs.deliveryCost)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency((costs.cost + costs.deliveryCost))}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency((costs.cost + costs.deliveryCost) / 10)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(((costs.cost + costs.deliveryCost) / 10) + ((costs.cost + costs.deliveryCost)))}</div>
            </div>

            <button class="place-order-button button-primary js-order-button">
                Place your order
            </button>
            </div>
        </div>`;
    document.querySelector(".js-payment-summary").innerHTML = script;

    document.querySelector(".js-order-button").addEventListener('click', async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
            
            const order = await response.json();
            addOrder(order);
        }
        catch(error){
            console.log('Unexpected error. Please try again later.');
        }

        window.location.href = 'orders.html';
    });
}

export function getQuantity(){
    let quan = 0;
    cart.forEach((item) => {
        quan += item.quantity;
    });
    return quan;
}

export function getCost(){
    let cost = 0;
    let deliveryCost = 0;
    let product;
    let option;
    cart.forEach((item) => {
        product = getProduct(item);
        cost += (item.quantity)*product.priceCents;
        option = getOption(item);
        deliveryCost += option.deliveryPriceCents;
    });
    return {cost, deliveryCost};
}

function getProduct(item){
    let retval;
    products.forEach((product) => {
        if(item.productId === product.id){
            retval = product;
        }
    });
    return retval;
}

function getOption(item){
    let retval;
    deliveryOptions.forEach((option) => {
        if(option.deliveryId === item.deliveryOptionId){
            retval = option;
        }
    });
    return retval;
}