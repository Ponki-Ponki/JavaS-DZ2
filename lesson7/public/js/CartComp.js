var cartMexin = {
    data(){
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            bigImgCart:'https://via.placeholder.com/150x100',
            cartUrl: '/api/cart',
            cartAllitem:{},
            cartItems: [],
            showCart: false,
        }
      },
      methods: {
          addProduct(product){
              let find = this.cartItems.find(el => el.id_product === product.id_product);
              if(find){
                  this.$parent.putJson(`${this.cartUrl}/${find.id_product}`, {quantity: 1});
                  find.quantity++;
              } else {
                  let prod = Object.assign({quantity: 1}, product);
                  this.$parent.postJson(this.cartUrl, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
              }
          },
          remove(item) {
              this.$parent.putJson(`${this.cartUrl}/${item.id_product}`, {quantity: -1})
                  .then(data => {
                      if(data.result === 1) {
                          if(item.quantity>1){
                              item.quantity--;
                          }else {
                              this.del(item)
                          }
                      }
                  })
          },
          del(item){
              this.$parent.deleteJson(`${this.cartUrl}/${item.id_product}`, item)
              .then(data =>{
                  if(data.result === 1) {
                      this.cartItems.splice(this.cartItems.indexOf(item),1)
                  }
              })
          },
          addItem(item){
              this.$parent.putJson(`${this.cartUrl}/${item.id_product}`, {quantity: 1})
                  .then(data => {
                      if(data.result === 1) {
                          item.quantity++;
                      }
                  })
          },
      },
      mounted(){
          this.$parent.getJson(this.cartUrl)
              .then(data => {
                  for(let el of data.contents){
                      this.cartItems.push(el);
                  }
              });
      }
}


Vue.component('cart', {
    mixins: [cartMexin],
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @del="del"
                @remove="remove"
                @addItem="addItem">
                </cart-item>
                <a class="btn" href="basket.html">Подробнее</a>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                <div class="product-bio">
                    <img :src="img" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.product_name}}</p>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                    <button class="btn" @click="$emit('addItem',cartItem)">+</button>
                    <button class="btn" @click="$emit('remove',cartItem)">-</button>
                    <button class="del-btn" @click="$emit('del', cartItem)">&times;</button>
                </div>
            </div>
    `
});