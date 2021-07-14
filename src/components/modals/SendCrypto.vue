<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
       aria-modal="true" v-if="open">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <Form @submit="submit" :validation-schema="schema" noValidate>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Send {{ currency }}
              </h3>
              <div class="mt-2">
                <div class="flex items-center justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="to">
                    To
                  </label>
                  <div class="text-red-700 text-sm">
                    <ErrorMessage name="to"/>
                  </div>
                </div>
                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                  <Field name="to" type="text" ref="to" id="to" placeholder="Paste address"
                         class="flex-shrink flex-grow flex-auto flex-1 form-input rounded rounded-r-none"/>
                  <div class="flex">
                    <span @click="isQrCodeReader = !isQrCodeReader"
                      class="flex items-center leading-normal bg-grey-lighter cursor-pointer rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </span>
                  </div>
                  <div v-if="isQrCodeReader" class="shadow p-2 rounded bg-white absolute z-10 right-0 -top-52 w-56 h-48">
                    <qr-stream @init="onInit" @decode="onDecode">
                      <div class="flex items-center justify-center h-full" v-if="loading">
                        <svg class="animate-spin mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    </qr-stream>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="flex items-center justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
                    Amount
                  </label>
                  <div class="text-red-700 text-sm">
                    <ErrorMessage name="amount"/>
                  </div>
                </div>
                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                  <Field name="amount" type="number" id="amount" placeholder="0.00"
                         class="flex-shrink flex-grow flex-auto flex-1 form-input rounded rounded-r-none"/>
                  <div class="flex">
                    <span
                      class="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                      {{ currency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" :disabled="isLoading"
                    class="w-full inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" v-if="isLoading">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!isLoading">Send</span>
            </button>
            <button type="button" @click="close()"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Field, Form, ErrorMessage} from "vee-validate"
import * as yup from "yup"
import {mapGetters} from "vuex"
import axios from "axios";
import {SAVE_WALLETS} from "@/store/keys";

export default {
  name: "SendCrypto",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    let schema = null
    return {
      open: false,
      schema,
      baseUrl: process.env.VUE_APP_WALLET_URL,
      currency: process.env.VUE_APP_CURRENCY,
      walletBalance: 0,
      isLoading: false,
      loading: false,
      isQrCodeReader: false
    };
  },
  computed: {
    ...mapGetters(["token", "wallets"])
  },
  methods: {
    close() {
      this.open = false;
    },
    getLatestBalance() {
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
    submit(values) {
      this.isLoading = true
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'sendtoaddress',
        params: [values.to, values.amount]
      }), {
        headers: {
          Authorization: 'Basic ' + this.token
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.error === null) {
          this.$toast.success('Transaction successful')
          this.close()
          // Get updated balance
          this.getLatestBalance()
        } else {
          this.$toast.error(response.data.error)
        }
      }).catch(error => {
        this.isLoading = false
        this.$toast.error(error.response.data.error)
      })
    },
    async onInit (promise) {
      this.loading = true
      let err = ''
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          err = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          err = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          err = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          err = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          err = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          err = "ERROR: Stream API is not supported in this browser"
        }
      } finally {
        this.loading = false
      }
      if (err) {
        this.$toast.error(err)
      }
    },
    onDecode(decodedStr) {
      document.getElementById('to').value = decodedStr
      this.isQrCodeReader = false
    }
  },
  mounted() {
    this.emitter.on("send-crypto", () => {
      this.open = true
      this.wallets.forEach(w => {
        this.walletBalance += Number(w.balance)
      })
      this.schema = yup.object({
        to: yup.string().required("Required"),
        amount: yup.number("Must be number").required("Required")
          .positive()
          .min(0.1, 'Minimum should be 0.1').max(this.walletBalance, 'Insufficient balance')
      })
    });
  }
};
</script>

<style scoped></style>
