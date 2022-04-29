class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];

        this._fetchGoods();
        this._render();
        this._sumValue();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            // console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
    // подсчитвает сумму товаров на странице католога и выводит в консоль
    _sumValue(){
        let sum = 0;
        this._goods.forEach(el =>sum+= el.price);
        return sum;
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
                </div>`;
    }
}

const list = new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

class BasketList{
    constructor(container = '.basket') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];
        
        this._render();
    }

    _render(){   // постороение списка товаров в корзине 
        for (const product of this._goods) {
            const productObject = new BasketItem(product);
            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
    
    _remove(elem){              // удаление товара из списка
        this._goods.forEach(el=> {
            if (elem.data.id === el.id){
                this._goods[el.id - 1].remove(); // или использовать splice()?
            }
        })
    }
    addQuantity(){}     //Добавить количество товара
    removeQuantuty(){}   //Убавить количество товара
}

document.querySelector('.basket').addEventListener('click', target =>{
    if (target.classlist.contains('basket-item')){
        target._remove(target);
        target.remove();
    }
});
document.querySelector('.btn-cart').addEventListener('click', event=> document.querySelector('.basket').classList.toggle('hidden'));

class BasketItem{
    constructor(product, img = 'https://via.placeholder.com/50x30', 
    quantity = 1){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
        this.quantity = quantity;
    }

    getHTMLString() { // добавление строки с товаром в корзине на странице
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <span>${this.quantity}</span>
                    <span>Price: ${this.price}*${this.quantity}</span>
                </div>`;
    }
}
