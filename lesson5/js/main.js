const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        basketItems: [],
        amount: 0,
        countGoods: 0,
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgBasket: 'https://via.placeholder.com/20x15',
        searchData: '',
        filtered: [],
        showBasket:false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filter() {
            let regexp = new RegExp(this.searchData, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    beforeCreate() {
        console.log('beforeCreate');
        console.log(this.products);
    },
    created() {
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    mounted() {
        console.log('mounted');
    }
});
