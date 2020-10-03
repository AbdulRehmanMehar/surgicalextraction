import axios from 'axios'

export default {
    namespaced: true,

    state: {
        account: JSON.parse(localStorage.getItem('account')) || null,

        loginLoader: false,
        loginSuccess: false,
        loginError: null,

        registerLoader: false,
        registerSuccess: false,
        registerError: null,

        resetLoader: false,
        resetSuccess: false,
        resetError: null,

        updateProfileLoader: false,
        updateProfileSuccess: false,
        updateProfileError: null
    },

    mutations: {
        SET_LOGIN_LOADING(state, payload) {
            state.loginLoader = payload
        },

        SET_LOGIN_SUCCESS(state, payload) {
            state.loginSuccess = payload
        },

        SET_LOGIN_ERROR(state, payload) {
            state.loginError = payload
        },

        SET_REGISTER_ERROR(state, payload) {
            state.registerError = payload
        },

        SET_REGISTER_LOADING(state, payload) {
            state.registerLoader = payload
        },

        SET_REGISTER_SUCCESS(state, payload) {
            state.registerSuccess = payload
        },

        SET_RESET_ERROR(state, payload) {
            state.resetError = payload
        },

        SET_RESET_LOADING(state, payload) {
            state.resetLoader = payload
        },

        SET_RESET_SUCCESS(state, payload) {
            state.resetSuccess = payload
        },

        SET_ACCOUNT(state, payload) {
            state.account = payload
            localStorage.setItem('account', JSON.stringify(payload))
        },

        LOGOUT(state) {
            state.account = null
            localStorage.removeItem('account')
        },

        SET_UPDATE_PROFILE_ERROR(state, payload) {
            state.updateProfileError = payload
        },

        SET_UPDATE_PROFILE_LOADING(state, payload) {
            state.updateProfileLoader = payload
        },

        SET_UPDATE_PROFILE_SUCCESS(state, payload) {
            state.updateProfileSuccess = payload
        },

    },

    actions: {
        login({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_LOGIN_LOADING', true)
                commit('SET_LOGIN_SUCCESS', false)
                commit('SET_LOGIN_ERROR', null)

                axios({ url: window.serverAddress + '/api/login', data, method: 'POST' })
                .then(resp => {
                    let account = resp.data.user
                    account.token = resp.data.access_token
                    commit('SET_ACCOUNT', account)
                    commit('SET_LOGIN_SUCCESS', true)
                    commit('SET_LOGIN_LOADING', false)
                    resolve(resp)
                })
                .catch(error => {
                    commit('LOGOUT')
                    commit('SET_LOGIN_ERROR', error)
                    commit('SET_LOGIN_LOADING', false)
                    reject(error)
                })
            })
        },

        register({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('SET_REGISTER_LOADING', true)
                commit('SET_REGISTER_SUCCESS', false)
                commit('SET_REGISTER_ERROR', null)
                axios({ url: window.serverAddress + '/api/register', data, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token_type + ' ' + resp.data.access_token
                        let account = resp.data.user
                        account.token = token
                        commit('SET_ACCOUNT', account)
                        commit('SET_REGISTER_SUCCESS', true)
                        commit('SET_REGISTER_LOADING', false)
                        resolve(resp)
                    })
                    .catch(error => {
                        commit('LOGOUT')
                        commit('SET_REGISTER_ERROR', error)
                        commit('SET_REGISTER_LOADING', false)
                        reject(error)
                    })
            })
        },

        reset({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_RESET_LOADING', true)
                commit('SET_RESET_SUCCESS', false)
                commit('SET_RESET_ERROR', null)

                axios({ url: window.serverAddress + '/api/reset-password', data, method: 'POST' })
                .then(resp => {
                    commit('SET_RESET_LOADING', false)
                    commit('SET_RESET_SUCCESS', true)

                    resolve(resp)
                }).catch(error => {
                    commit('LOGOUT')
                    commit('SET_RESET_ERROR', error)
                    commit('SET_RESET_LOADING', false)
                    reject(error)
                })
            })
        },

        logout({ commit }) {
            commit('LOGOUT')
        },

        updateUserPersonalInfo({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('SET_UPDATE_PROFILE_LOADING', true)
                commit('SET_UPDATE_PROFILE_SUCCESS', false)
                commit('SET_UPDATE_PROFILE_ERROR', null)
                axios({ url: window.serverAddress + '/api/update-user', data, method: 'POST'})
                .then(resp => {
                    console.log(resp)

                    commit('SET_UPDATE_PROFILE_SUCCESS', true)
                    commit('SET_UPDATE_PROFILE_LOADING', false)
                    resolve(resp)
                })
                .catch(error => {
                    commit('LOGOUT')
                    commit('SET_UPDATE_PROFILE_ERROR', error)
                    commit('SET_UPDATE_PROFILE_LOADING', false)
                    reject(error)
                })
            })
        },

        addNewAddress({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/address', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },

        updateAddress({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/address/'+data.address_id, data, method: 'PATCH' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },

        deleteAddress({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/address/'+data.address_id, data, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },

        addImage({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/image', data, method: 'POST' })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
            })
        },

        deleteImage({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/image/' + id, method: 'DELETE' })
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            })
        },

        verify_email({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/verify-email/' + id, method: 'POST' })
                .then(resp => {
                    resolve(resp)
                }).catch(error => reject(error))
            })
        },

        password_reset({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/reset-password/' + id, method: 'GET' })
                    .then(resp => {
                        const token = resp.data.token_type + ' ' + resp.data.access_token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    commit('load_user', user)
                        resolve(resp)
                    }).catch(error => reject(error))
            })
        },

        cancel_verify_email({commit},id) {
            return new Promise(resolve => {
                resolve(true)
            })
        },

        cancel_password_reset({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/cancel-reset-password/' + id, method: 'GET' })
                    .then(resp => {
                        resolve(resp)
                    }).catch(error => reject(error))
            })
        }
    },

    getters: {
        account: (state) => state.account,

        loginError: (state) => state.loginError,
        loginLoader: (state) => state.loginLoader,
        loginSuccess: (state) => state.loginSuccess,

        registerError: (state) => state.registerError,
        registerLoader: (state) => state.registerLoader,
        registerSuccess: (state) => state.registerSuccess,

        resetError: (state) => state.resetError,
        resetLoader: (state) => state.resetLoader,
        resetSuccess: (state) => state.resetSuccess,

        updateProfileError: (state) => state.updateProfileError,
        updateProfileLoader: (state) => state.updateProfileLoader,
        updateProfileSuccess: (state) => state.updateProfileSuccess,
    }
}
