Vue.component('error',{
	data(){
		return {
			showErr: false,
			typeErr: '',
		}
	},
	template:`
	<div class= "error" v-show="this.showErr">{{ this.typeErr}}</div>`
});