import { generateCart } from "./checkout/orderSummary.js";
import { generateSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){
    try{
        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            //throw 'error';
            loadCart(() => {
                //reject('error2');
                resolve();
            });
        })
    }
    catch(error){
        console.log('unexpected error. Please try again later.');
    }
    
    generateCart();
    
    generateSummary();
}

loadPage();

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });

// }).then((val) => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })

// }).then(() => {
//     generateCart();
//     generateSummary(0); 
// });

// async function loadPage() {
//     console.log('load page');

//     await loadProductsFetch();

//     return 'value 2';
// }
// loadPage().then((value) => {
//     console.log('next step');
//     console.log(value);
// })

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })
// ]).then(() => {
//     generateCart();
//     generateSummary(0); 
// });


// loadProducts(() => {
//     loadCart(() => {
//         generateCart();
//         generateSummary();
//     });
// });