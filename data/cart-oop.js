
function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId){
            let item;
            this.cartItems.forEach((product) => {
                if(product.productId === productId){
                    item = product;
                }
            });
            if(item) {
                item.quantity++;
            } else {
                this.cartItems.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
            this.saveToStorage();
        },
        removeFromCart(id){
            const newCart = [];
            this.cartItems.forEach((item) =>{
                if(item.productId !== id){
                    newCart.push(item);
                }
            })
            this.cartItems = newCart;
            this.saveToStorage();
        },
        updateDeliveryOption(productId, deliveryOptionId){
            let item;
            this.cartItems.forEach((product) => {
                if(product.productId === productId){
                    item = product;
                }
            });
            item.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart(1);
const businessCart = Cart(2);

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

