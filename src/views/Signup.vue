<template>
  <div class="pt-6">
    <div class="mx-auto w-full max-w-md px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
      <h1 class="text-xl font-bold mb-4">Wallet</h1>
      <Form :validation-schema="schema" @submit="submit">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email Address
            </label>
            <div class="text-red-700 text-sm">
              <ErrorMessage name="email"/>
            </div>
          </div>
          <Field id="email" class="form-input w-full rounded" name="email"/>
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
          <Field id="password" class="form-input w-full rounded" name="password" type="password"/>
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
          <Field id="confirm" class="form-input w-full rounded" name="confirm" type="password"/>
        </div>

        <div class="mb-4">
          <p class="text-xs">
            By creating an account, you agree to Cointopay’s
            <a class="text-blue-700 hover:text-blue-900 hover:underline" href="https://cointopay.com/terms"
               target="_blank">Terms of Service</a> &
            <a class="text-blue-700 hover:text-blue-900 hover:underline" href="https://cointopay.com/terms"
               target="_blank">Privacy Policy</a>.
          </p>
        </div>

        <div class="flex items-center justify-between">
          <button :disabled="isLoading" class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-full"
                  type="submit">
            <svg v-if="isLoading" class="animate-spin mx-auto h-5 w-5 text-white"
                 fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
            </svg>
            <span v-if="!isLoading">Create Wallet</span>
          </button>
        </div>
      </Form>
    </div>
    <div class="text-center mt-4">
      <router-link :to="{ name: 'login' }" class="text-gray-700 text-bold" tag="a">
        Already have a wallet? Sign In
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { FIRST_LOGIN, SAVE_TOKEN, SAVE_WALLET_ID, SAVE_WALLETS, SET_IS_LOGGED_IN, SET_MNEMONICS } from "@/store/keys"

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
        params: [values.password, values.email]
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
          this.$store.commit(FIRST_LOGIN, true)
          this.$router.push({ name: 'home' })
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
