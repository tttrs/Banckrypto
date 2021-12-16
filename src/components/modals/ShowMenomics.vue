<template>
  <modal :show="show" @close="closeModal()">
    <template #title>
      <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
        {{ mnemonics.length > 0 ? 'Secret Private Key Recovery Passphrase' : 'Wallet ID' }}
      </h3>
    </template>
    <template #content>
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="text-center sm:mt-0 sm:text-left overflow-hidden">
          <div v-if="mnemonics.length > 0" class="max-w-full">
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-700 bg-red-100 rounded">
                    Carefully write down these 12 words in order. Do not email or screenshot your Secret Private Key Recovery Phrase.
                  </span>
          </div>
          <div class="mt-4">
            Wallet ID: {{ walletId }}
          </div>
          <div class="max-w-full mt-4">
            <div v-for="(word, index) in mnemonics" :key="index" class="w-1/3 inline-block">
              {{ index + 1 + '. ' + word }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm" type="button"
                @click="closeModal()">
          Close
        </button>
      </div>
    </template>
  </modal>
</template>

<script>

import Modal from './Modal'
import { mapGetters } from "vuex"
import axios from "axios"

export default {
  name: "ShowMnemonics",
  components: {
    Modal
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      show: false,
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
    closeModal() {
      this.show = false
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
    this.emitter.on('show-mnemonics', (args) => {
      this.getPassPhrase()
      this.show = true
      if (this.mnemonics.length === 0 && typeof args.mnemonics !== undefined) {
        this.mnemonics = args.mnemonics ? args.mnemonics.split(' ') : []
      }
    })
  }
}
</script>

<style scoped></style>
