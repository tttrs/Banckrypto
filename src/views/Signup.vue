<template>
  <div class="mx-auto w-full max-w-md mt-6 px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
    <h1 class="text-xl font-bold mb-4">Wallet</h1>
    <Form @submit="submit" :validation-schema="schema">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email Address
          </label>
          <div class="text-red-700 text-sm">
            <ErrorMessage name="email"/>
          </div>
        </div>
        <Field name="email" id="email" class="form-input w-full rounded"/>
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

      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm">
            Confirm Password
          </label>
          <div class="text-red-700 text-sm">
            <ErrorMessage name="confirm"/>
          </div>
        </div>
        <Field name="confirm" type="password" id="confirm" class="form-input w-full rounded"/>
      </div>

      <div class="mb-4">
        <p class="text-xs">
          By creating an account, you agree to Cointopay’s
          <a href="https://cointopay.com/terms" target="_blank" class="text-blue-700 hover:text-blue-900 hover:underline">Terms of Service</a> &
          <a href="https://cointopay.com/terms" target="_blank" class="text-blue-700 hover:text-blue-900 hover:underline">Privacy Policy</a>.
        </p>
      </div>

      <div class="flex items-center justify-between">
        <button :disabled="isLoading" type="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-full">
          <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" v-if="isLoading">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="!isLoading">Create Wallet</span>
        </button>
      </div>
    </Form>
  </div>
  <div class="text-center mt-4">
    <router-link tag="a" :to="{ name: 'login' }" class="text-gray-700 text-bold">
      Already have a wallet? Sign In
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import {Field, Form, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import {SAVE_TOKEN, SAVE_WALLET_ID, SAVE_WALLETS, SET_IS_LOGGED_IN, SET_MNEMONICS} from "@/store/keys";

export default {
  name: "Signup",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    const schema = yup.object({
      email: yup.string().required('Required'),
      password: yup.string().required('Required').min(8),
      confirm: yup.string().required('Required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    return {
      schema,
      baseUrl: process.env.VUE_APP_WALLET_URL,
      isLoading: false
    }
  },
  methods: {
    submit(values) {
      this.isLoading = true
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'createwallet',
        params: [values.password]
      })).then(response => {
        this.isLoading = false
        if (response.data.error === null) {
          const data = response.data.result
          this.$store.commit(SET_IS_LOGGED_IN, true)
          this.$store.commit(SAVE_WALLET_ID, data.walletId)
          const token = btoa(data.walletId + ':' + values.password)
          this.$store.commit(SAVE_TOKEN, token)
          const wallets = [
            {
              address: data.address,
              balance: 0,
              totalReceived: 0,
              type: "primary"
            }
          ]
          this.$store.commit(SAVE_WALLETS, wallets)
          this.$store.commit(SET_MNEMONICS, data.mnemonics)
          this.$router.push({name: 'home'})
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
