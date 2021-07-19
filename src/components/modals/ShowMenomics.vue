<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"
       v-if="open">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mt-3 text-center sm:mt-0 sm:text-left overflow-hidden">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {{ mnemonics.length > 0  ? 'Secret Private Key Recovery Passphrase' : 'Wallet ID' }}
            </h3>
            <div class="mt-2">
              <div class="max-w-full" v-if="mnemonics.length > 0">
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-700 bg-red-100 rounded">
                    Carefully write down these 12 words in order. Do not email or screenshot your Secret Private Key Recovery Phrase.
                  </span>
              </div>
              <div class="mt-4">
                Wallet ID: {{ walletId }}
              </div>
              <div class="max-w-full mt-4">
                <div class="w-1/3 inline-block" v-for="(word, index) in mnemonics" :key="index">
                  {{ index + 1 + '. ' + word }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="close()"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "ShowMnemonics",
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      open: false,
      mnemonics: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    walletId() {
      const token = atob(this.token)
      return token.split(':')[0]
    }
  },
  methods: {
    close() {
      this.open = false
    },
    getPassPhrase() {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: "passphrase",
        params: null
      }), {
        headers: {
          Authorization: 'Basic ' + this.token
        }
      }).then(response => {
        if (response.data.error === null) {
          if (response.data.result !== null) {
            this.mnemonics = response.data.result.split(' ')
          }
        }
      }).catch(error => {
        console.log(error.response.data.error)
      })
    }
  },
  mounted() {
    this.getPassPhrase()
    this.emitter.on('show-mnemonics', (args) => {
      this.open = true
      if (this.mnemonics.length === 0 && typeof args.mnemonics !== undefined) {
        this.mnemonics = args.mnemonics ? args.mnemonics.split(' ') : []
      }
    })
  }
}
</script>

<style scoped></style>
