const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
    {id: 5},
];

const renderProduct = (title = 'Товар', price = 'цена') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
};


const renderProducts = (list) => {
    const productList = list.map(good => renderProduct(good.title, good.price));
    document.querySelector('.products').innerHTML = productList.join("");
    //Выводилось с запятыми, потому что выводился массив  объектов, а не текст
    //из-зы этого выводились все эелменты, запятые в том числе, метод join()
    //преобразует массив в строку, тем самым убирая запятые и не выводит их.
    //Так-же можно собственноручно через цикл пройтись и записать все элементы 
    //массива в одну строку, либо вручную написать небольшую функцию.
    // console.log(productList);
};

renderProducts(products);
document.querySelectorAll('.product-item')
    .forEach(el => {el.style.padding = '20px' });
document.querySelector('.products').style.display = 'flex';
