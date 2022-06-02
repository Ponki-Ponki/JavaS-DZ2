Vue.component('basket', {
	mixins: [cartMexin],
	mounted(){
		this.$parent.getJson(this.cartUrl)
					.then(data => {
						this.cartAllitem = data;
						}
				);
	},
	template: `
			<div class="basket">
					<div class="basket-block">
							<p v-if="!cartItems.length">Корзина пуста</p>
							<cart-item class="cart-item" 
							v-for="item of cartItems" 
							:key="item.id_product"
							:cart-item="item" 
							:img="bigImgCart"
							@del="del"
							@remove="remove"
							@addItem="addItem">
							</cart-item>
					</div>
					<div>Общая стоимость: {{cartAllitem.amount}} р.</div>
					<div>
					<input class="btn" type="submit" value="Оформить заказ">
					<a class="btn" href="index.html">В каталог</a>
					</div>
			</div>`
});