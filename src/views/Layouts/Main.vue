<template>
  <nav class=" bg-gray-200 shadow fixed w-full top-0 z-10">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button aria-controls="mobile-menu"
                  aria-expanded="false"
                  class="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  type="button">
            <span class="sr-only">Open main menu</span>
            <svg aria-hidden="true" class="block h-6 w-6" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <svg aria-hidden="true" class="hidden h-6 w-6" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <router-link :to="{name: 'explorer'}" tag="a">
              <img alt="Banckrypto" class="h-8 w-auto" src="/logo.png">
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6 flex-1">
            <div class="flex items-center justify-between">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <template v-if="!isLoggedIn">
                  <router-link :to="{ name: 'explorer' }"
                               class="text-gray-700 hover:text-green-500 active:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
                               tag="a">
                    Explorer
                  </router-link>
                  <router-link :to="{ name: 'wallet' }"
                               class="text-gray-700 hover:text-green-500 active:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
                               tag="a">
                    Wallet
                  </router-link>
                </template>
                <template v-if="isLoggedIn">
                  <router-link :to="{ name: 'home' }"
                               class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-green-500 active:text-green-500"
                               tag="a">
                    Home
                  </router-link>
                  <a class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-green-500"
                     href="javascript:void(0)"
                     @click="launchSendCryptoModal()">
                    Send
                  </a>
                  <a class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-green-500"
                     href="javascript:void(0)"
                     @click="launchRequestCryptoModal()">
                    Request
                  </a>
                  <a class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-green-500"
                     href="https://cointopay.com" target="_blank">
                    Buy / Sell
                  </a>
                </template>
              </div>
              <div class="flex items-center">
                <a v-if="isLoggedIn" class="text-green-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="refreshBalance()">
                  <svg class="h-6 w-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"/>
                  </svg>
                </a>
                <a v-if="isLoggedIn"
                   class="text-gray-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="launchVerifyPasswordModal()">
                  Wallet Private Key
                </a>
                <a v-if="isLoggedIn"
                   class="text-gray-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="launchSecurityModal()">Security</a>
                <a v-if="isLoggedIn"
                   class="text-gray-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                   @click="logout()">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <template v-if="!isLoggedIn">
          <router-link :to="{ name: 'explorer' }"
                       class="text-gray-700 hover:text-green-500 px-3 py-2 block rounded-md text-sm font-medium"
                       tag="a">
            Explorer
          </router-link>
          <router-link :to="{ name: 'wallet' }"
                       class="text-gray-700 hover:bg-gray-700 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium"
                       tag="a">
            Wallet
          </router-link>
        </template>
        <template v-if="isLoggedIn">
          <router-link :to="{ name: 'home' }" class="text-white px-3 py-2 block rounded-md text-sm font-medium"
                       tag="a">
            Home
          </router-link>
          <a class="text-white px-3 py-2 block rounded-md text-sm font-medium" href="javascript:void(0)"
             @click="launchSendCryptoModal()">
            Send
          </a>
          <a class="text-white px-3 py-2 block rounded-md text-sm font-medium" href="javascript:void(0)"
             @click="launchRequestCryptoModal()">
            Request
          </a>
          <a class="text-white px-3 py-2 block rounded-md text-sm font-medium" href="https://cointopay.com"
             target="_blank">
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
    <div style="min-height: calc(100vh - 165px)">
      <router-view/>
    </div>
  </div>
  <Footer></Footer>

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
import Footer from "./Partials/Footer"

export default {
  name: "Main",
  components: {Footer, ShowPrivateKey, ShowMnemonics, VerifyPassword, SendCrypto, RequestCrypto},
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
      this.socket = new WebSocket('wss://artemis.cointopay.com/coinectar/updates')
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

<style scoped></style>
