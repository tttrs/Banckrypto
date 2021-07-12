<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"
    v-if="open">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <Form @submit="submit" :validation-schema="schema">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="mt-3 text-center sm:mt-0 sm:text-left overflow-hidden">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Verify password
              </h3>
              <div class="mt-2">
                <div class="flex items-center justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                  </label>
                  <div class="text-red-700 text-sm">
                    <ErrorMessage name="password"/>
                  </div>
                </div>
                <Field name="password" type="password" id="password"
                       class="appearance-none border rounded w-full p-3 text-gray-700"/>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" :disabled="isLoading"
                    class="w-full inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24" v-if="isLoading">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!isLoading">Verify</span>
            </button>
            <button type="button" @click="close()"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Field, Form, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import {mapGetters} from "vuex"
import axios from "axios"

export default {
  name: "VerifyPassword",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    const schema = yup.object({
      password: yup.string().required('Required')
    })
    return {
      schema,
      baseUrl: process.env.VUE_APP_WALLET_URL,
      address: null,
      open: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
        'token'
    ])
  },
  methods: {
    close() {
      this.open = false
    },
    submit(values) {
      const token = atob(this.token).split(':')
      if (token.length === 2 && values.password === token[1]) {
        this.isLoading = true
        axios.post(`${this.baseUrl}`, JSON.stringify({
          method: 'dumpprivkey',
          params: [this.address]
        }), {
          headers: {
            Authorization: 'Basic ' + this.token
          }
        }).then(response => {
          if (response.data.error === null) {
            this.isLoading = false
            this.close()
            this.emitter.emit('show-private-key', {
              address: this.address,
              key: response.data.result
            })
          } else {
            this.$toast.error(response.data.error)
          }
        }).catch(error => {
          this.isLoading = false
          this.$toast.error(error.response.data.error)
        })
      } else {
        this.$toast.error('Incorrect password')
      }
    }
  },
  mounted() {
    this.emitter.on('verify-password', (args) => {
      this.open = true
      this.address = args.address
    })
  }
}
</script>

<style scoped></style>