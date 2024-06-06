import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector('#productContainer');

const productTemplate = document.querySelector('#productTemplate');


export const showProductContainer = (product) => {
    if (!product) {
        return false ;
    }

    product.forEach((curPro) => {
        const { brand , category , description , id , image ,  name , price , stock  } = curPro ;

        const productClone = document.importNode(productTemplate.content , true)

        productClone.querySelector('#cardValue').setAttribute("id" , `card${id}`)

        
        productClone.querySelector('.productName').textContent = name ;
        
        productClone.querySelector('.productImage').src = image ;
        
        productClone.querySelector('.productImage').alt = name ;
        
        productClone.querySelector('.category').textContent = category ;
        
        productClone.querySelector('.productStock').textContent =  stock;
        
        productClone.querySelector('.productPrice').textContent =  `PKR ${price}`;

        productClone.querySelector('.productActualPrice').textContent = `PKR ${price * 2}`;
        
        productClone.querySelector('.productDescription').textContent = description ;
        
        productClone.querySelector('.stockElement').addEventListener("click", (event) =>  {
            homeQuantityToggle(event , id , stock);
        });
        

        productClone.querySelector(".add-to-cart-button").addEventListener("click" , (event) => {
            addToCart(event, id , stock);
        })



        productContainer.append(productClone);
    });

}