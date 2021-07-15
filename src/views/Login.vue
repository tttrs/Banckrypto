<template>
  <div class="mx-auto w-full max-w-md mt-6 px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
    <h1 class="text-xl font-bold mb-4">Welcome Back!</h1>
    <Form @submit="submit" :validation-schema="schema">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="walletId">
            Wallet ID
          </label>
          <div class="text-red-700 text-sm">
            <ErrorMessage name="walletId"/>
          </div>
        </div>
        <Field name="walletId" id="walletId" class="form-input w-full rounded"/>
      </div>

      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <div class="text-red-700 text-sm">
            <ErrorMessage name="password"/>
          </div>
        </div>
        <Field name="password" type="password" id="password" class="form-input w-full rounded"/>
      </div>
      <div class="flex items-center justify-between">
        <button
            class="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-900 disabled:opacity-50 text-white font-bold py-3 px-4 rounded w-full"
            :disabled="isLoading">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" v-if="isLoading">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="!isLoading">Log In</span>
        </button>
      </div>
    </Form>
  </div>
  <div class="text-center mt-4">
    <router-link tag="a" :to="{ name: 'signup' }" class="text-gray-700 text-bold">
      Don't have a wallet? Sign Up
    </router-link>
  </div>
</template>

<script>
import {Field, Form, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import axios from "axios"
import {
  SET_IS_LOGGED_IN,
  SAVE_WALLET_ID,
  SAVE_TOKEN,
  SAVE_WALLETS
} from '@/store/keys'

export default {
  name: "Login",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    const schema = yup.object({
      walletId: yup.string().required('Required'),
      password: yup.string().required('Required')
    })
    return {
      isLoading: false,
      schema,
      baseUrl: process.env.VUE_APP_WALLET_URL
    }
  },
  methods: {
    submit(values) {
      this.isLoading = true
      const token = btoa(values.walletId + ':' + values.password)
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'loadwallet',
        params: null
      }), {
        headers: {
          Authorization: 'Basic ' + token
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.error === null) {
          if (response.data.result !== null) {
            const data = response.data.result
            this.$store.commit(SET_IS_LOGGED_IN, true)
            this.$store.commit(SAVE_WALLET_ID, values.walletId)
            this.$store.commit(SAVE_TOKEN, token)
            this.$store.commit(SAVE_WALLETS, data)
            this.$router.push({name: 'home'})
          } else {
            this.$toast.error('Invalid Credentials')
          }
        } else {
          this.$toast.error(response.data.error)
        }
      }).catch(error => {
        this.isLoading = false
        this.$toast.error(error.response.data.error)
      })
    }
  }
}
</script>

<style scoped></style>
