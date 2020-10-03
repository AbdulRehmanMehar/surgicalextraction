import axios from 'axios'

export default {
    namespaced: true,

    state: {
        categories: [],
        loader: false,
        success: false,
        error: null
    },

    mutations: {

        SET_CATEGORIES(state, payload) {
            state.categories = payload
        },

        SET_SUCCESS(state, payload) {
            state.success = payload
        },

        SET_LOADER(state, payload) {
            state.loader = payload
        },

        SET_ERROR(state, payload) {
            state.error = payload
        },

        ADD_CATEGORY(state, payload) {
            state.categories.push(payload)
        },

    },

    actions: {
        get_all_categories({commit}) {
            return new Promise((resolve, reject) => {
                commit('SET_LOADER', true)
                commit('SET_SUCCESS', false)
                commit('SET_ERROR', null)

                axios.get(window.serverAddress + '/api/category')
                .then(resp => {
                    commit('SET_SUCCESS', true)
                    commit('SET_LOADER', false)
                    commit('SET_CATEGORIES', resp.data.data)
                    resolve(resp.data.data)
                })
                .catch(error => {
                    commit('SET_ERROR', error)
                    commit('SET_LOADER', false)
                    reject(error)
                })
            })
        },

        // get_category_data({commit}, id) {
        //     return new Promise((resolve, reject) => {
        //         axios({ url: window.serverAddress + '/api/category/' + id, method: 'GET' })
        //             .then(resp => {
        //                 resolve(resp)
        //             }).catch(error => reject(error))
        //     })
        // },

        add_new_category({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_LOADER', true)
                commit('SET_SUCCESS', false)
                commit('SET_ERROR', null)
                axios({ url: window.serverAddress + '/api/category', data, method: 'POST' })
                .then(resp => {
                    console.log(resp)
                    commit('SET_SUCCESS', true)
                    commit('SET_LOADER', false)
                    resolve(resp)
                })
                .catch(error => {
                    commit('SET_ERROR', error)
                    commit('SET_LOADER', false)
                    reject(error)
                })
            })
        },
        edit_category({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' +data.category_id, data, method: 'PATCH' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },
        delete_category({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/category/' + id, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        }
    },

    getters: {
        loader: (state) => state.loader,
        success: (state) => state.success,
        error: (state) => state.error,
        categories: (state) => state.categories,
        categoriesWithSubCategories: (state) => state.categories.filter(category =>
            !category.parent && category.subcategories.length),
        parentCategoriesWithoutSubCategories: (state) =>
            state.categories.filter(category => !category.parent && !category.subcategories.length),
        categoryById: state => category_id => state.categories.filter(category => category.id ==category_id)[0]
    }
}
