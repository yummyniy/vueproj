import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const app = {
    data() {
    return {
        url: 'https://vue3-course-api.hexschool.io/v2',
        user:  {
        username: '',
        password: ''
        },
    }
    },
    methods: {
    login () {
        axios.post(this.url + '/admin/signin', this.user)
        .then((res) => {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${ token }; expires=${ new Date(expired) };`;
        window.location = 'product2.html'
        })
        .catch((error) => {
        console.dir(error);
        })
    }
    }
};
Vue.createApp(app).mount('#app');