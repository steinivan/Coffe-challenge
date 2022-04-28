const shopContainer = document.querySelector(".shop-container")
const menuContainer = document.querySelector(".our-menus")
function CartElementsProduct(codeId){
        const img = codeId.path[2].childNodes[3].currentSrc
        const text = codeId.path[2].children[2].innerText
        const price = codeId.path[2].children[4].children[0].childNodes[1].innerText
        shopCart(img,text,price)
        
}
function CartElementsMenu(codeId){
        const img = codeId.path[1].getElementsByTagName("img")[0].src
        const text = codeId.path[1].getElementsByTagName("h3")[0].innerText
        const price = codeId.path[1].getElementsByTagName("p")[0].innerText.replace('$','')
        shopCart(img,text,price)
}
function shopCart(img,text,price){
        const shopContainerCard = document.querySelector(".item-shop")
        const shopTitle = shopContainer.getElementsByTagName("img")
        for (let index = 0; index < shopTitle.length; index++) {
                let quantityInput = shopTitle[index].parentElement.parentElement.querySelector(".input-quantity")
                if (img===shopTitle[index].src) {
                        quantityInput.value++
                        totalShop()
                        modalCompra()
                        return
                }
        }       


        const shopContainerContent = document.createElement('div')
        shopContainerContent.classList.add("shop-items")
        
        const shopContent = `
                <div class="item-shop">
                        <img class"item-shop-img" style="height: 4em;" src="${img}">
                        <h4 class="item-shop-title">${text}</h4>
                </div> 
                <div class="item-price">
                        $${price}
                </div>
                <div class="item-quantity">
                        <input class="input-quantity" style="width: 3em;height: 2em;" type="number" name="quantity-input" id="quantity-input" value="1" min="1" step="1">
                        
                        <i class="fa-solid fa-xmark shop-delete"></i>
                </div>    
        `
        shopContainerContent.innerHTML+=  shopContent
        shopContainer.append(shopContainerContent)

        shopContainerContent.querySelector(".shop-delete").addEventListener("click",shopRemove);
        
        shopContainerContent.querySelector(".input-quantity").addEventListener("change",shopQuantity);
        modalCompra()
        totalShop()
}
function modalCompra(){
        const main = document.querySelector("main")
        const modal = document.createElement("div")
        modal.classList.add("modal-compra")
        const modalContent = `
                <h3>Añadido al Carrito</h3>
                <i class="fa-solid fa-xmark modal-shop-delete"></i>
        `
        modal.innerHTML+= modalContent
        main.append(modal)

        const modals = document.getElementsByClassName("modal-compra")
        setTimeout(()=>{
                modals[0].remove()
        },1001)
}
function totalShop(){
        let total = 0
        let totalQuantity = 0
        const shopTotal = document.querySelector(".shop-total-text")
        const shopCartItems = document.querySelectorAll(".shop-items")
        shopCartItems.forEach(element=>{
                const shopCartItemsPrice = element.querySelector(".item-price")
                const shopCartItemsPriceElement = Number(shopCartItemsPrice.textContent.replace('$',''))
                const shopCartItemsQuantity = element.querySelector(".input-quantity")
                const shopCartItemsQuantityElement = Number(shopCartItemsQuantity.value)

                totalQuantity = totalQuantity + shopCartItemsQuantityElement
                total = total + shopCartItemsPriceElement * shopCartItemsQuantityElement
                
        })
        shopTotal.innerHTML=`Total = $${total.toFixed(2)}`
        cartElements(totalQuantity)
}
function shopQuantity(event){
        if(event.target.value<1) event.target.value=1
        totalShop(event)
}
function cartElements(cart){
        const cartIcon = document.querySelector(".shop-icons")
        const cartNumber = document.createElement("div")
        const comprobarCartIcon = document.getElementsByClassName("shop-number")
        if(comprobarCartIcon.length===0)
        {
                cartNumber.classList.add("shop-number")
                cartNumber.innerHTML = 1
                cartIcon.append(cartNumber)
        }
        comprobarCartIcon[0].innerText = cart
        if(comprobarCartIcon[0].innerText==0) comprobarCartIcon[0].remove()

}
function shopRemove(event){
        const buttonDelete = event.target
        buttonDelete.closest(".shop-items").remove()
        totalShop()
}