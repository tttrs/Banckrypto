import {createStore} from 'vuex'

import {
    SET_IS_LOGGED_IN,
    UNSET_IS_LOGGED_IN,
    SAVE_WALLET_ID,
    SAVE_TOKEN,
    SAVE_WALLETS
} from './keys'

export default createStore({
    state: {
        isLoggedIn: false,
        walletId: null,
        token: null,
        wallets: []
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        walletId: (state) => state.walletId,
        token: (state) => state.token,
        wallets: (state) => state.wallets
    },
    mutations: {
        [SET_IS_LOGGED_IN](state, payload) {
            state.isLoggedIn = payload
        },
        [UNSET_IS_LOGGED_IN](state, payload) {
            state.isLoggedIn = payload
        },
        [SAVE_WALLET_ID](state, payload) {
            state.walletId = payload
        },
        [SAVE_TOKEN](state, payload) {
            state.token = payload
        },
        [SAVE_WALLETS](state, payload) {
            state.wallets = payload
        }
    },
    actions: {},
    modules: {}
})
