import { getCartProductFromLS } from "./getCartProduct";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (event, id, stock, price) => {
    const curCardElement = document.querySelector(`#card${id}`);
    const productQuantity = curCardElement.querySelector(".productQuantity");
    const productPrice = curCardElement.querySelector(".productPrice");

    let quantity = 1;
    let localStoragePrice = 0;

    let localCartProducts = getCartProductFromLS();

    let existingProd = localCartProducts.find((curProd) => curProd.id = id);

    if (existingProd) {
        quantity = existingProd.quantity;
        localStoragePrice = existingProd.price
    }else{
        localStoragePrice = price;
            price = price ;
    }

    if (event.target.className === 'cartIncrement') {
        if (quantity < stock) {
            quantity += 1;            
        }else if(quantity === stock){
            quantity = stock;
            localStoragePrice = price * stock;
        }
    }

    if (event.target.className === "cartDecrement") {
        if (quantity > 1) {
            quantity -= 1 ;
        }
    }

    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2));

    let updatedCart = { id, quantity, price: localStoragePrice };

        updatedCart = localCartProducts.map((curProd) => {
            return curProd.id === id ? updatedCart : curProd;
        });
        // console.log(updatedCart);
        localStorage.setItem('cartProductLS', JSON.stringify(updatedCart));

        productQuantity.innerText = quantity;
        productPrice.innerText = localStoragePrice;

        updateCartProductTotal();
};