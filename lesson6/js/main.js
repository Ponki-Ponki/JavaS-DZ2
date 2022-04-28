const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // show error component
                    this.$refs.error.typeErr = error.message;
                    this.$refs.error.showErr = true;
                    console.log(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

