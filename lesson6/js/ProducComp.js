Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.osinka.ru%2Finfo%2Fbanners%2Fosinka_banner_200x150_1.png&f=1&nofb=1',
        }
    },
    methods: {
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of $root.$refs.filtered.filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
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
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
<!--                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
});
