<template>
  <nav class="bg-blue-700 fixed w-full top-0 z-10">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://cointopay.com/assets/img/logo.e3ab5038.svg"
                 alt="Cointopay">
            <img class="hidden lg:block h-8 w-auto"
                 src="https://cointopay.com/assets/img/logo.e3ab5038.svg" alt="Cointopay">
          </div>
          <div class="hidden sm:block sm:ml-6 flex-1">
            <div class="flex items-center justify-between">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <template v-if="!isLoggedIn">
                  <router-link tag="a" :to="{ name: 'explorer' }"
                               class="text-white px-3 py-2 rounded-md text-sm font-medium">
                    Explorer
                  </router-link>
                  <router-link tag="a" :to="{ name: 'wallet' }"
                               class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Wallet
                  </router-link>
                </template>
                <template v-if="isLoggedIn">
                  <router-link tag="a" :to="{ name: 'home' }"
                               class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white active:text-white">
                    Home
                  </router-link>
                  <a href="javascript:void(0)" @click="launchSendCryptoModal()"
                     class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white">
                    Send
                  </a>
                  <a href="javascript:void(0)" @click="launchRequestCryptoModal()"
                     class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white">
                    Request
                  </a>
                  <a href="javascript:void(0)"
                     class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white">
                    Buy / Sell
                  </a>
                </template>
              </div>
              <div class="flex items-center">
                <a v-if="isLoggedIn" class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  @click="refreshBalance()">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </a>
                <a v-if="isLoggedIn" class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="launchVerifyPasswordModal()">
                  Wallet Private Key
                </a>
                <a v-if="isLoggedIn" class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="launchSecurityModal()">Security</a>
                <a v-if="isLoggedIn" class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="logout()">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <template v-if="!isLoggedIn">
          <router-link tag="a" :to="{ name: 'explorer' }"
                       class="text-white px-3 py-2 block rounded-md text-sm font-medium">
            Explorer
          </router-link>
          <router-link tag="a" :to="{ name: 'wallet' }"
                       class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Wallet
          </router-link>
        </template>
        <template v-if="isLoggedIn">
          <router-link tag="a" :to="{ name: 'home' }"
                       class="text-white px-3 py-2 block rounded-md text-sm font-medium">
            Home
          </router-link>
          <a href="javascript:void(0)" @click="launchSendCryptoModal()"
             class="text-white px-3 py-2 block rounded-md text-sm font-medium">
            Send
          </a>
          <a href="javascript:void(0)" @click="launchRequestCryptoModal()"
             class="text-white px-3 py-2 block rounded-md text-sm font-medium">
            Request
          </a>
          <a href="javascript:void(0)"
             class="text-white px-3 py-2 block rounded-md text-sm font-medium">
            Buy / Sell
          </a>
          <a v-if="isLoggedIn" class="text-white px-3 py-2 block rounded-md text-sm font-medium cursor-pointer"
             @click="launchVerifyPasswordModal()">
            Wallet Private Key
          </a>
          <a v-if="isLoggedIn" class="text-white px-3 py-2 block rounded-md text-sm font-medium cursor-pointer"
             @click="launchSecurityModal()">Security</a>
          <a class="text-white px-3 py-2 block rounded-md text-sm font-medium cursor-pointer"
             @click="logout()">Logout</a>
        </template>
      </div>
    </div>
  </nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-4">
    <router-view/>
  </div>
  <send-crypto></send-crypto>
  <request-crypto></request-crypto>
  <verify-password></verify-password>
  <show-mnemonics></show-mnemonics>
  <show-private-key></show-private-key>
</template>

<script>
import {mapGetters} from "vuex"
import RequestCrypto from '@/components/modals/RequestCrypto.vue'
import SendCrypto from '@/components/modals/SendCrypto.vue'
import VerifyPassword from "@/components/modals/VerifyPassword";
import ShowMnemonics from "@/components/modals/ShowMenomics";
import ShowPrivateKey from "@/components/modals/ShowPrivateKey";
import axios from "axios";
import {SAVE_WALLETS} from "@/store/keys";

export default {
  name: "Main",
  components: {ShowPrivateKey, ShowMnemonics, VerifyPassword, SendCrypto, RequestCrypto},
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      socket: null,
      isCloseSocket: false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'wallets',
    ]),
    isLoggedIn() {
      if (this.token && this.token !== '') {
        const token = atob(this.token)
        const values = token.split(':')
        if (values.length === 2) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    refreshBalance() {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'loadwallet',
        params: null
      }), {
        headers: {
          Authorization: 'Basic ' + this.token
        }
      }).then(response => {
        if (response.data.error === null) {
          const wallets = response.data.result
          this.$store.commit(SAVE_WALLETS, wallets)
        } else {
          this.$toast.error(response.data.error)
        }
      }).catch(error => {
        this.$toast.error(error.response.data.error)
      })
    },
    launchSendCryptoModal() {
      this.emitter.emit('send-crypto', {})
    },
    launchRequestCryptoModal() {
      if (this.wallets.length > 0) {
        this.emitter.emit('request-crypto', {
          address: this.wallets[0].address
        })
      }
    },
    launchVerifyPasswordModal() {
      this.emitter.emit('verify-password', {
        address: null
      })
    },
    launchSecurityModal() {
      this.emitter.emit('show-mnemonics', {})
    },
    logout() {
      let state = this.$store.state
      let newState = {}
      const initialState = {
        isLoggedIn: false,
        walletId: null,
        token: null,
        wallets: []
      }
      Object.keys(state).forEach(key => {
        newState[key] = initialState[key]
      });
      this.$store.replaceState(newState);
      this.$router.push({name: 'login'})
    },
    initSocket() {
      this.socket = new WebSocket('ws://localhost:8080/coinectar/updates')
      const self = this
      this.socket.onmessage = (event) => {
        if (event && event.data) {
          const data = JSON.parse(event.data)
          if (self.wallets) {
            let isRefreshBalance = false
            self.wallets.forEach(w => {
              data.transactions.forEach(t => {
                if (w.address === t.to || w.address === t.from) {
                  isRefreshBalance = true
                }
              })
            })
            if (isRefreshBalance) {
              self.refreshBalance()
            }
          }
        }
      }
      this.socket.onclose = () => {
        if (!self.isCloseSocket) {
          self.initSocket()
        }
      }
    }
  },
  mounted() {
    this.initSocket()
  },
  unmounted() {
    if (this.socket) {
      this.isCloseSocket = true
    }
  }
}
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  color: white;
}
</style>
