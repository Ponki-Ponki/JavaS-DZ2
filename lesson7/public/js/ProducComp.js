Vue.component('products', {
    data(){
        return {
            catalogUrl: '/api/products',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <a class="btn" href="product.html" :item="product">Подробнее</a>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});
Vue.component('product1', {
    props:['item'],

    data(){
        return {
            img: 'https://via.placeholder.com/600x550',
        }
    },
    template: `
    <div class="product-item1">
                <div class="desc">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                    <h3>{{item.product_name}}</h3>
                    <p>{{item.price}}₽</p>
                    <p>"Описание товара"</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
                    <a class="btn" href="index.html">В каталог</a>
                    </div>
                </div>
            </div>
    `
});
