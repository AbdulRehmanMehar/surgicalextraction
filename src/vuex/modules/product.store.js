import axios from 'axios'


const state = {
    products: [],
    featured_products: [],

    featured_loader: false,
    featured_success: false,
    featured_error: null,

    loader: false,
    success: false,
    error: null,

}

const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },

    SET_FEATURED_PRODUCTS(state, payload) {
        state.featured_products = payload
    },

    SET_FEATURED_LOADER(state, payload) {
        state.featured_loader = payload
    },

    SET_FEATURED_SUCCESS(state, payload) {
        state.featured_success = payload
    },

    SET_FEATURED_ERROR(state, payload) {
        state.featured_error = payload
    },

    SET_LOADER(state, payload) {
        state.loader = payload
    },

    SET_SUCCESS(state, payload) {
        state.success = payload
    },

    SET_ERROR(state, payload) {
        state.error = payload
    },
}

const actions = {
        get_featured_products({commit}) {
            return new Promise((resolve, reject) => {
                commit('SET_FEATURED_LOADER', true)
                commit('SET_FEATURED_SUCCESS', false)
                commit('SET_FEATURED_ERROR', null)

                axios({ url: window.serverAddress + '/api/featured-product', method: 'GET' })
                .then(resp => {
                    let featured_products = resp.data.data

                    commit('SET_FEATURED_PRODUCTS', featured_products)
                    commit('SET_FEATURED_SUCCESS', true)
                    commit('SET_FEATURED_LOADER', false)
                    resolve(resp)
                }).catch(error => {

                    commit('SET_FEATURED_ERROR', error)
                    commit('SET_FEATURED_LOADER', false)

                    reject(error)
                })
            })
        },

        get_products({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_LOADER', true)
                commit('SET_SUCCESS', false)
                commit('SET_ERROR', null)
                //?page='+ data.page + (data.category ? '&category=' + data.category : '') + (data.search_query ? '&search=' + data.search_query : '')
                axios({ url: window.serverAddress + '/api/product', method: 'GET'})
                .then(resp => {
                    console.log(resp.data.data)
                    commit('SET_SUCCESS', true)
                    commit('SET_LOADER', false)
                    commit('SET_PRODUCTS', resp.data.data)
                    resolve(resp.data.data)
                })
                .catch(error => {
                    commit('SET_ERROR', error)
                    commit('SET_LOADER', false)
                    reject(error)
                })
            })
        },

        get_product({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + id, method: 'GET' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        add_product({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        update_product({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + data.product_id, data: data, method: 'PATCH' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        delete_product({commit}, id) {
            console.log(id)
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/product/' + id, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        set_featured_product({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/featured-product', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },
        remove_featured_product({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/featured-product/' + data.product, data, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        remove_image({commit}, data) {
            return  new Promise((resolve, reject)=> {
                axios({ url: window.serverAddress + '/api/image/' + data, data, method: 'DELETE' })
                .then(resp => resolve(resp))
                .catch(err => reject(err))
            })
        }
    }


const getters = {
    featured_products: (state) => state.featured_products,
    products: (state) => state.products,
    getProductBySlug: (state) => (slug) => state.products.filter(product => product.slug == slug)[0],
    getProductsByCategoryId: state => category_id => state.products.filter(product => product.category.id == category_id)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}