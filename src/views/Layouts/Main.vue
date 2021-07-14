<template>
  <nav class="bg-blue-700">
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
              <a v-if="isLoggedIn" class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                 @click="logout()">Logout</a>
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
                       class="text-white px-3 py-2 rounded-md text-sm font-medium">
            Explorer
          </router-link>
          <router-link tag="a" :to="{ name: 'wallet' }"
                       class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Wallet
          </router-link>
        </template>
        <template v-if="isLoggedIn">
          <router-link tag="a" :to="{ name: 'home' }"
                       class="text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </router-link>
          <a href="javascript:void(0)" @click="launchSendCryptoModal()"
             class="text-white px-3 py-2 rounded-md text-sm font-medium">
            Send
          </a>
          <a href="javascript:void(0)" @click="launchRequestCryptoModal()"
             class="text-white px-3 py-2 rounded-md text-sm font-medium">
            Request
          </a>
          <a href="javascript:void(0)"
             class="text-white px-3 py-2 rounded-md text-sm font-medium">
            Buy / Sell
          </a>
          <a class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
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
</template>

<script>
import {mapGetters} from "vuex"
import RequestCrypto from '@/components/modals/RequestCrypto.vue'
import SendCrypto from '@/components/modals/SendCrypto.vue'

export default {
  name: "Main",
  components: {SendCrypto, RequestCrypto},
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
