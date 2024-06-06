import products from './api/product.json';
import { fetchQuantityFromCartLS } from './fetchQuantityFromCartLS';
import { getCartProductFromLS } from './getCartProduct';
import { incrementDecrement } from './incrementDecrement';
import { removeProdFormCart } from './removeProdFormCart';
import { updateCartProductTotal } from './updateCartProductTotal';

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id );
});

// console.log(filterProducts);

const cartElement = document.querySelector('#productCartContainer');
const templateContainer = document.querySelector('#productCartTemplate');

const showCartProducts = () => {
    filterProducts.forEach((curProd) => {
        const { brand , category , description , id , image ,  name , price , stock  } = curProd ;

        let productClone = document.importNode(templateContainer.content , true);

        const lSActualData = fetchQuantityFromCartLS(id, price)

        productClone.querySelector('#cardValue').setAttribute("id" ,`card${id}`)
        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('.productImage').src = image;
        productClone.querySelector('.productImage').alt = name;
        productClone.querySelector('.productName').textContent = name;


        productClone.querySelector('.productQuantity').textContent = lSActualData.quantity;
        productClone.querySelector('.productPrice').textContent = lSActualData.price;

        productClone.querySelector('.stockElement').addEventListener('click' , (event) => incrementDecrement(event, id, stock, price));

        productClone.querySelector('.remove-to-cart-button').addEventListener('click' , () =>  removeProdFormCart(id));

        cartElement.append(productClone);
    })
}

showCartProducts();

updateCartProductTotal();