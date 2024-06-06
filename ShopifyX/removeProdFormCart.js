import { showToast } from "./showToast";
import { getCartProductFromLS } from "./getCartProduct";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFormCart = (id) => {
    let cartProducts = getCartProductFromLS();

    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    localStorage.setItem('cartProductLS', JSON.stringify(cartProducts));

    let removeDiv = document.getElementById(`card${id}`);

    if (removeDiv) {
        removeDiv.remove();
        showToast("Remove" , id);
    }
    
    updateCartValue(cartProducts);
    
    updateCartProductTotal();
};