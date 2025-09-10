export let cart = JSON.parse(localStorage.getItem('cart')) || []; 

export function addToCart(productId){
    let item;
    cart.forEach((product) => {
        if(product.productId === productId){
            item = product;
        }
    });
    if(item) {
        item.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

export function removeFromCart(id){
    const newCart = [];
    cart.forEach((item) =>{
        if(item.productId !== id){
            newCart.push(item);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let item;
    cart.forEach((product) => {
        if(product.productId === productId){
            item = product;
        }
    });
    item.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart(generate){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
   console.log(xhr.response);
    generate();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}