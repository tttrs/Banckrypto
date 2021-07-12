<template>
  <div class="w-full max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
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
        <Field name="email" id="email"
               class="appearance-none border rounded w-full p-3 text-gray-700"/>
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
        <Field name="password" type="password" id="password"
               class="appearance-none border rounded w-full p-3 text-gray-700"/>
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
        <Field name="confirm" type="password" id="confirm"
               class="appearance-none border rounded w-full p-3 text-gray-700"/>
      </div>

      <div class="mb-4">
        <p class="text-xs">
          By creating an account, you agree to Cointopay’s
          <a href="https://cointopay.com/terms" target="_blank" class="text-blue-700 hover:text-blue-900 hover:underline">Terms of Service</a> &
          <a href="https://cointopay.com/terms" target="_blank" class="text-blue-700 hover:text-blue-900 hover:underline">Privacy Policy</a>.
        </p>
      </div>

      <div class="flex items-center justify-between">
        <button
            class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded w-full">Create Wallet
        </button>
      </div>
    </Form>
  </div>
  <div class="text-center mt-4">
    <router-link tag="a" :to="{ name: 'login' }" class="text-white text-bold">
      Already have a wallet? Sign In
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import {Field, Form, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'

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
      baseUrl: process.env.VUE_APP_WALLET_URL
    }
  },
  methods: {
    submit(values) {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'createwallet',
        params: [values.password]
      })).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped></style>