const url = "../archivosJSON"
const menuArticle = document.querySelector(".our-menus")
const productsArticle = document.querySelector(".products")
const customerArticle = document.querySelector(".customers")
const search = document.querySelector(".search-icon")
const searchInput = document.querySelector(".search")
const shop = document.querySelector(".shop")
const shopIcon = document.querySelector(".shop-icon")
const shopContain = document.querySelector(".shop-container")

let productShop = []

fetch(`${url}/cafes.json`)
.then(data => data.json())
.then(res => GenericFunction(res))
.catch(err => console.log(err))

function GenericFunction(res){
    const menu = res.cafes
    const product = res.products
    const customer = res.customers

    const star = (num,clase)=>{
        const classStar = document.querySelector(`.${clase}`)
        let starT = []
        if (num>10) num=10
        for (let n = num; n > 0; n--) {
            if (n<1 && n>0){
                starT.push(`<i class="fa-solid fa-star-half-stroke"></i>`)
            }
            if (n>=1){
                starT.push(`<i class="fa-solid fa-star"></i>`)
            }
        }
        starT.forEach(element => {
            classStar.innerHTML+=element
        });
        
    }

    function sections(){
        for (let index = 0; index < menu.length; index++) {
            menuArticle.innerHTML+=`
        <div class="card-menu card">
            <img src="./images/${menu[index].img}">
            <h3 >${menu[index].nombre}</h3>
            <div class="card-price">
                <p class="menu-price">${menu[index].price}</p>
                <p>${menu[index].descuento}</p>
            </div>
            <p class="btn btn-menu">Add To Cart</p>
        </div>
        `
        }

        for (let index = 0; index < product.length; index++) {
            productsArticle.innerHTML+=`
            <div class="card-product card">
                <div class="div-icon-product">
                    <i id="NicaraguaCoffee-${index+1}" class="fa-solid fa-cart-shopping icon-product icon-shop"></i>
                    <i class="fa-solid fa-heart icon-product"></i>
                    <i class="fa-solid fa-eye icon-product"></i>
                </div>
                <img src="./images/${product[index].img}">
                <h3 >${product[index].nombre}</h3>
                <div class="estrellas-${index} stars">
                    
                    
                </div>
                <div class="card-price">
                    <div>$<p name="product-price">${product[index].price}</p>
                    </div>
                    <p>${product[index].descuento}</p>
                </div>
            </div>
            `
            star(product[index].stars,`estrellas-${index}`)
        }

        for (let index = 0; index < customer.length; index++) {
            customerArticle.innerHTML+=`
            <div class="card-customer card">
                <img src="./images/quote-img.png" alt="comillas">
                <p>Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. 
                Animi Nulla Sit Libero Nemo Fuga Sequi Nobis? 
                Necessitatibus Aut Laborum, Nisi Quas Eaque 
                Laudantium Consequuntur Iste Ex Aliquam Minus Vel?
                Nemo.</p>
                <img src="./images/${customer[index].img}" class="customer-img" alt="imgPerfil${index+1}">
                <h3>${customer[index].nombre}</h3>
                <div class="estrellasCustomer-${index} stars"></div>
            </div>
            `
            star(customer[index].stars,`estrellasCustomer-${index}`)
        }
        
    
    const productShop = document.querySelectorAll(".icon-shop")
    const menuShop = document.querySelectorAll(".btn-menu")
    productShop.forEach((element=>{
        element.addEventListener("click",((element)=>{
            CartElementsProduct(element)
        }))
    }))
    menuShop.forEach((element=>{
        element.addEventListener("click",((element)=>{
            CartElementsMenu(element)
        }))
    }))
    }
    sections()
    
}

search.addEventListener("click",(()=>{
    searchInput.classList.toggle("search-active")
    shop.classList.remove("shop-active")
}))
shopIcon.addEventListener("click",(()=>{
    shop.classList.toggle("shop-active")
    searchInput.classList.remove("search-active")
    
}))
window.addEventListener('scroll',(()=>{
    shop.classList.remove("shop-active")
    console.log("zombie")
}))



