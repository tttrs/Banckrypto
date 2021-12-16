import { createStore } from 'vuex'

import {
  FIRST_LOGIN,
  SAVE_TOKEN,
  SAVE_WALLET_ID,
  SAVE_WALLETS,
  SET_IS_LOGGED_IN,
  SET_MNEMONICS,
  UNSET_IS_LOGGED_IN
} from './keys'

export default createStore({
    state: {
      isLoggedIn: false,
      walletId: null,
      token: null,
      wallets: [],
      mnemonics: null,
      isFirstLogin: false
    },
    getters: {
      isLoggedIn: (state) => state.isLoggedIn,
      walletId: (state) => state.walletId,
      token: (state) => state.token,
      wallets: (state) => state.wallets,
      mnemonics: (state) => state.mnemonics,
      isFirstLogin: (state) => state.isFirstLogin
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
      },
      [SET_MNEMONICS](state, payload) {
        state.mnemonics = payload
      },
      [FIRST_LOGIN](state, payload) {
        state.isFirstLogin = payload
      }
    },
    actions: {},
    modules: {}
})
