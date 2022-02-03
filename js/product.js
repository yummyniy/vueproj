import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
let productModal = null;
let delProductModal = null;
const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'testpp',
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false
    }
  },
  methods: {
    checkLogin() {
      axios.post(this.url + '/api/user/check')
      .then((res) => {
        // console.log(res);
        this.getProducts();
      })
      .catch((error) => {
        // console.dir(error);
        window.location = 'login.html';
      })
    },
    getProducts() {
      axios.get(this.url + '/api/' + this.path + '/admin/products')
        .then((res) => {
          // console.log(res.data);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        })
    },
    updateProduct() {
      let id = '';
      let method = 'post';
      if (!this.isNew) {
        method = 'put';
        id = '/' + this.tempProduct.id;
      }
      axios[method](this.url + '/api/' + this.path + '/admin/product' + id, { data: this.tempProduct })
        .then((res) => {
          productModal.hide();
          alert(res.data.message);
          this.getProducts();
        })
        .catch((error) => {
          console.dir(error);
        })
    },
    delProduct() {
      axios.delete(this.url + '/api/' + this.path + '/admin/product/' + this.tempProduct.id)
        .then((res) => {
          delProductModal.hide();
          alert(res.data.message);
          this.getProducts();
        })
        .catch((error) => {
          console.dir(error);
        })
    },
    showModal(act, product) {
      if (act == 'new') {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      }
      else if (act == 'edit') {
        this.isNew = false;
        this.tempProduct = { ...product };
        // console.log(this.tempProduct);
        productModal.show();
      }
      else if (act == 'delete') {
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
    addImage() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    // alert("hello");
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin()
  }
};

Vue.createApp(app).mount('#app');