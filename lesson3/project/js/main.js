const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error open source');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
}


class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];

        this._fetchGoods();
        // this.getProducts()
        //     .then((data) => {
        //         this._goods = data;
        //         this._render();
        //         console.log(this.getTotalPrice());
        //     });
    }

    _fetchGoods() {
        getRequest(`${API}/catalogData.json`)
            .then((data)=>{
                this._goods = JSON.parse(data);
                this._render();
            })
            .catch(err=>console.log(err))
    }
    
    // getProducts() {
    //     return fetch(`${API}/catalogData.json`)
    //         .then(response => response.json())
    //         .catch(err => console.log(err));
    // }

    getTotalPrice() {
        return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    addBasket(id_product){
        let permission;
        getRequest(`${API}/addToBasket.json`)
            .then((data)=>{
                permission = JSON.parse(data);
                if(permission.result === 1){
                    this._goods.forEach(el=>{
                        if (id_product == el.id_product){
                            basket._goods.contents.push(el);
                        }
                    })
                    basket._render();
                }
            })
            .catch(err=>console.log(err));
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id_product}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.product_name}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
    }
}

const list = new ProductList();

{
let div = document.createElement('div');
div.classList.add('basket');
document.querySelector('header').appendChild(div);
document.querySelector('.basket').addEventListener('click', event =>{
    if (event.target.parentNode.classList.contains('basket-item')){
        if(event.target.classList.contains('del-item')){
            basket._remove(event.target.parentNode);
            event.target.parentNode.remove();
        }
    }
});
document.querySelector('.btn-cart').addEventListener('click', event=> document.querySelector('.basket').classList.toggle('hidden'));
}

class BasketList{
    constructor(container = '.basket') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];
        
        this._fetchGoods()
    }

    _fetchGoods() {
        getRequest(`${API}/getBasket.json`)
            .then((data)=>{
                this._goods = JSON.parse(data);
                this._render();
            })
            .catch(err=>console.log(err))
    }

    _render(){   // постороение списка товаров в корзине 
        for(let i = 0;i != this.container.childNodes.length;){
            this.container.childNodes[i].remove();
        }
        for (const product of this._goods.contents) {
            const productObject = new BasketItem(product);

            
            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
    
    _remove(elem){              // удаление товара из списка
        let permission;
        getRequest(`${API}/deleteFromBasket.json`)
            .then((data)=>{
                permission = JSON.parse(data);
                if(permission.result === 1){
                    let i = 0;
                    this._goods.contents.forEach(el=> {
                        if (elem.dataset.id == el.id_product){
                            this._goods.contents.splice(i ,1);
                        }
                        i++;
                    })
                }
            })
            .catch(err=>console.log(err));
    }
}

class BasketItem{
    constructor(product, img = 'https://via.placeholder.com/50x30', 
    quantity = 1){
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
        if (product.quantity != undefined){
            this.quantity = product.quantity;
        }else{
            this.quantity = quantity;
        }
    }

    getHTMLString() { // добавление строки с товаром в корзине на странице
        return `<div class="basket-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <span>${this.quantity}</span>
                    <span>Price: ${this.price * this.quantity}</span>
                    <p class="del-item">Удалить</p>
                </div>`;
    }

}

const basket = new BasketList();

document.querySelector('main').addEventListener('click', event=> {
    if (event.target.classList.contains('buy-btn')){
        list.addBasket(event.target.parentNode.parentNode.dataset.id);
    }
})