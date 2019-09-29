import axios from 'axios'

export default {
    state: {
        token: localStorage.getItem('token') || null,
        user: null
    },
    mutations: {
        auth_success(state, token) {
            state.token = token
        },
        load_user(state, user) {
            state.user = user
        },
        logout(state) {
            state.user = null
            state.token = null
        },
    },
    actions: {
        login({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/login', data, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token_type + ' ' + resp.data.access_token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    commit('load_user', user)
                    resolve(resp)
                })
                .catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            })
        },
        register({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/register', data, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token_type + ' ' + resp.data.access_token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
                        commit('load_user', user)
                        resolve(resp)
                    })
                    .catch(error => {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        reject(error)
                    })
            })
        },
        reset({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/reset-password', data, method: 'POST' })
                .then(resp => {
                    resolve(resp)
                }).catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        loadUser({commit}) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/get-user', method: 'POST' })
                .then(resp => {
                    commit('load_user', resp.data.data)
                    resolve(resp)
                }).catch(error => {
                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    reject(error)
                })
            });
        },
        updateUserPersonalInfo({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/update-user', data, method: 'POST'})
                .then(resp => resolve(resp))
                .catch(error => reject(error))
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
        password_reset({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios({ url: window.serverAddress + '/api/reset-password/' + id, method: 'POST' })
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
                axios({ url: window.serverAddress + '/api/cancel-reset-password/' + id, method: 'POST' })
                    .then(resp => {
                        resolve(resp)
                    }).catch(error => reject(error))
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        currentUser: state => state.user
    }
}
