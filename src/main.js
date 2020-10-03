import './bootstrap'
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import store from './vuex'
import VueCarousel from 'vue-carousel'
import VueToastr from '@deveodk/vue-toastr'
import CKEditor from '@ckeditor/ckeditor5-vue'
import 'bulma/css/bulma.css'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(Vuex)
Vue.use(CKEditor)
Vue.use(VueRouter)
Vue.use(VueToastr)
Vue.use(VueCarousel)
Vue.prototype.$http = Axios
// window.serverAddress = window.location.origin

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

const app = new Vue({
    store,

    data: {
        name: 'Surgical Extraction',
        navbar: true,
        navburger: false,
        footer: true,
    }, computed: {
        cart: function() { return this.$store.getters.cart},
        isLoggedIn: function () { return this.$store.getters.isLoggedIn },
        currentUser: function () { return this.$store.getters.currentUser },
    },
    router,

    beforeCreate() {
        this.$store.dispatch('Category/get_all_categories')
        this.$store.dispatch('Product/get_products')
    },

    mounted() {
        let url = '/' + window.location.href.split('/').pop()
        hidenSeek(url)
    },
    methods: {
        setTitle: function(data) {
            document.title = data + ' - ' + this.name
        },
    },
    render: h => h(App)
})

const hidenSeek = (url) => {
    if (url == '/login' || url == '/register' || url == '/reset-password' || url == '/terms-and-conditions') app.navbar = false
    else app.navbar = true
    if (url == '/login' || url == '/register' || url == '/reset-password' || url == '/terms-and-conditions') app.footer = false
    else app.footer = true
}

const updateTitle = (info) => {
    const nearestWithTitle = info.slice().reverse().find(r => r.meta && r.meta.title)
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title + ' - ' + app.name
    else document.title = app.name
}

router.beforeEach((to, from, next) => {
    hidenSeek(to.path)
    updateTitle(to.matched)
    app.navburger = false
    next()
})

router.onError(error => {
    if (/loading chunk \d* failed./i.test(error.message)) {
        window.location.reload()
    }
})

app.$mount('#vue-application')
