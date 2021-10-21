<template>
  <div class="bg-gray-50 mx-auto p-12">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 lg:col-span-1">
        <h1 class="text-2xl font-bold text-gray-600 mb-4">EURx Crypto Wallet</h1>
        <p class="text-sm font-normal text-gray-600 mb-24">This crypto wallet is the first hybrid blockchain bank
          wallet. You can transfer your EURx currency via the blockchain but you can also buy/sell trade it on
          cointopay.com. It is a stable currency which is being sold for one Euro per coin, however it has a limited
          supply of 100000000 units and can be traded on reflextrader.com. You can also import your EURx and send it via
          your verified bank account. You may also download this wallet and run it yourself. Welcome to the
          decentralized future!</p>
        <div>
          <router-link tag="a" :to="{ name: 'signup' }"
                       class="bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded mr-2 shadow">
            Getting Started
          </router-link>
          <router-link tag="a" :to="{ name: 'login' }"
                       class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded shadow">
            Login
          </router-link>
        </div>
      </div>
      <div class="hidden lg:block lg:col-span-1">
        <div class="ml-auto w-full max-w-md px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <h1 class="text-xl font-bold mb-4">Recover Wallet</h1>
          <Form @submit="submit" :validation-schema="schema">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Recovery Option
              </label>
              <ErrorMessage name="opt"/>
              <div class="mt-2">
                <label class="inline-flex items-center">
                  <Field name="opt" type="radio" class="form-radio" value="mnemonics" v-model="opt"/>
                  <span class="ml-2">Mnemonics</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <Field name="opt" type="radio" class="form-radio" value="key" v-model="opt"/>
                  <span class="ml-2">Private Key</span>
                </label>
              </div>
            </div>
            <div class="mb-4" v-if="opt === 'mnemonics'">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Mnemonics
              </label>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(mnemonic, idx) in mnemonics" :key="mnemonic.id">
                  <div class="flex items-center justify-between">
                    <label class="block text-gray-700 text-sm font-bold mb-2" :for="`mnemonics_${idx}`">
                      {{ mnemonic.id }}
                    </label>
                    <div class="text-red-700 text-sm">
                      <ErrorMessage :name="`mnemonics[${idx}].word`" />
                    </div>
                  </div>
                  <Field :name="`mnemonics[${idx}].word`" type="text" :id="`mnemonics_${idx}`" class="form-input w-full rounded"/>
                </div>
              </div>
            </div>
            <div class="mb-4" v-if="opt === 'key'">
              <div class="flex items-center justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="privateKey">
                  Private Key
                </label>
                <div class="text-red-700 text-sm">
                  <ErrorMessage name="privateKey"/>
                </div>
              </div>
              <Field name="privateKey" type="text" id="privateKey" class="form-input w-full rounded"/>
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
                     autocomplete="off"/>
            </div>
            <div class="flex items-center justify-between">
              <button :disabled="isLoading" type="submit"
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-full">
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
import axios from "axios"
import {SAVE_TOKEN, SAVE_WALLET_ID, SAVE_WALLETS, SET_IS_LOGGED_IN} from "@/store/keys"

export default {
  name: "Wallet",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      opt: 'mnemonics',
      mnemonics: [],
      isLoading: false
    }
  },
  computed: {
    schema() {
      return yup.object({
        opt: yup.string().required('Required'),
        mnemonics: this.opt === 'mnemonics' ? yup.array().of(
          yup.object().shape({
            word: yup.string().required('Required').label('word')
          })
        ).strict() : yup.array(),
        privateKey: this.opt === 'key' ? yup.string().required('Required') : yup.string(),
        password: yup.string().required('Required')
      })
    }
  },
  methods: {
    submit(values) {
      const val = values.opt === 'key' ? values.privateKey : values.mnemonics.map(v => {
        return v.word
      }).join(' ').trim()
      this.isLoading = true
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'recoverwallet',
        params: [values.password, val]
      })).then(response => {
        this.isLoading = false
        if (response.data.error) {
          this.$toast.error(response.data.error)
        } else {
          const data = response.data.result
          const token = btoa(data.wallet.walletId + ':' + values.password)
          this.$store.commit(SET_IS_LOGGED_IN, true)
          this.$store.commit(SAVE_WALLET_ID, data.wallet.walletId)
          this.$store.commit(SAVE_TOKEN, token)
          this.$store.commit(SAVE_WALLETS, data.balance)
          this.$router.push({name: 'home'})
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
  },
  mounted() {
    for(let i = 1; i <= 12; i++) {
      this.mnemonics.push({
        id: i
      })
    }
  }
}
</script>

<style scoped></style>
