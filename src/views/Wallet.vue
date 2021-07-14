<template>
  <div class="bg-blue-50 mx-auto p-12">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 lg:col-span-1">
        <h1 class="text-2xl font-bold text-gray-600 mb-4">EURx Crypto Wallet</h1>
        <p class="text-sm font-normal text-gray-600 mb-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec vehicula dictum mollis. Fusce venenatis nunc id mi condimentum, a placerat orci semper. Sed sit amet
          mauris convallis, viverra risus ut, auctor dolor. Etiam sed ipsum vel libero tempus malesuada. Vestibulum
          euismod quam mi, quis convallis ex faucibus id. Nunc efficitur vehicula neque, a pharetra elit facilisis in.
          Duis finibus nunc vitae dignissim posuere. Nam aliquam, augue ac dictum blandit, dui urna feugiat nunc, at
          mollis arcu nunc at diam. Aliquam porttitor non arcu nec volutpat. Quisque elementum luctus velit, id lobortis
          magna consequat sit amet. In dignissim congue nisi, et facilisis sem convallis eget.</p>
        <div>
          <router-link tag="a" :to="{ name: 'signup' }"
                       class="bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded mr-2 shadow">
            Getting Started
          </router-link>
          <router-link tag="a" :to="{ name: 'login' }"
                       class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded shadow">
            Login
          </router-link>
        </div>
      </div>
      <div class="hidden lg:block lg:col-span-1">
        <div class="ml-auto w-full max-w-md px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <h1 class="text-xl font-bold mb-4">Recover Wallet</h1>
          <Form @submit="submit" :validation-schema="schema">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Recovery Option
              </label>
              <div class="mt-2">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio" name="option" value="mnemonics"
                         v-model="form.option">
                  <span class="ml-2">Mnemonics</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input type="radio" class="form-radio" name="option" value="key"
                         v-model="form.option">
                  <span class="ml-2">Private Key</span>
                </label>
              </div>
            </div>
            <div class="mb-4" v-if="form.option === 'mnemonics'">
              <div class="flex items-center justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="mnemonics">
                  Mnemonics
                </label>
                <div class="text-red-700 text-sm">
                  <ErrorMessage name="mnemonics"/>
                </div>
              </div>
              <Field name="mnemonics" type="text" id="mnemonics" class="form-input w-full rounded"
                     v-model="form.mnemonics"/>
            </div>
            <div class="mb-4" v-if="form.option === 'key'">
              <div class="flex items-center justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="privateKey">
                  Private Key
                </label>
                <div class="text-red-700 text-sm">
                  <ErrorMessage name="privateKey"/>
                </div>
              </div>
              <Field name="privateKey" type="text" id="privateKey" class="form-input w-full rounded"
                     v-model="form.privateKey"/>
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
              <Field name="password" type="password" id="password" class="form-input w-full rounded"
                     v-model="form.password"/>
            </div>
            <div class="flex items-center justify-between">
              <button :disabled="isLoading" type="submit"
                      class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded w-full">
                <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="!isLoading">Recover Wallet</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate"
import * as yup from "yup"

export default {
  name: "Wallet",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    return {
      form: {
        option: 'key',
        mnemonics: '',
        privateKey: '',
        password: ''
      },
      isLoading: false
    }
  },
  computed: {
    schema() {
      return yup.object({
        option: yup.string().required('Required'),
        mnemonics: this.form.option === 'mnemonics' ? yup.string().required('Required') : yup.string(),
        privateKey: this.form.option === 'key' ? yup.string().required('Required') : yup.string(),
        password: yup.string().required('Required')
      })
    }
  },
  methods: {
    submit(values) {
      console.log(values)
      this.isLoading = true
      this.$toast.info('Coming soon')
    },
  },
  mounted() {
  }
}
</script>

<style scoped></style>
