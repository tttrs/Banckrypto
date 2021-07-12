<template>
  <search></search>
  <loader :loading="isLoading"></loader>
  <div v-if="address">
    <h1 class="text-lg font-bold">Address</h1>
    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="col-span-4 lg:col-span-1">
        <div class="flex justify-center border rounded py-6">
          <qrcode-vue :value="address.address" :size="240"></qrcode-vue>
        </div>
      </div>
      <div class="col-span-4 lg:col-span-3">
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Address</div>
          <div class="col-span-3 flex items-center">
            <div class="overflow-hidden overflow-ellipsis inline-block">{{ address.address }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block"
                 viewBox="0 0 20 20" fill="currentColor" @click="copyToClipboard(address.address)">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Format</div>
          <div class="col-span-3">
            <span
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-700 bg-blue-100 rounded">
            secp256k1</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Transactions</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ address.transactions.length }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Total Received</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ address.totalReceivedBalance + ' ' + currency }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Total Sent</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">
            {{ address.totalReceivedBalance - address.balance + ' ' + currency }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-2">
          <div class="text-gray-500">Final Balance</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ address.balance + ' ' + currency }}</div>
        </div>
      </div>
    </div>
    <h1 class="text-lg font-bold mt-4">Transactions</h1>
    <div v-for="(transaction) in address.transactions" :key="transaction.hash"
         class="overflow-hidden rounded hover:bg-gray-100 bg-white mt-4">
      <transaction-summary :transaction="transaction" :copy="false" :link="true" :address="address.address"></transaction-summary>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import QrcodeVue from 'qrcode.vue'
import Utils from '../utils'
import Search from "../components/Search"
import TransactionSummary from "../components/TransactionSummary"
import Loader from "../components/Loader"

export default {
  name: "Address",
  components: {Loader, Search, TransactionSummary, QrcodeVue},
  data() {
    return {
      baseUrl: process.env.VUE_APP_EXPLORER_URL,
      address: null,
      isLoading: true,
      currency: process.env.VUE_APP_CURRENCY
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.address && to.params.address !== from.params.address) {
        this.getAddressInformation(to.params.address)
      }
    }
  },
  methods: {
    getAddressInformation(address) {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'search',
        params: [address]
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.address = response.data.result
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        this.address = null
        console.log(error)
      })
    },
    copyToClipboard(val) {
      return Utils.copyToClipboard(val, this)
    }
  },
  mounted() {
    if (this.$route.params.address) {
      this.getAddressInformation(this.$route.params.address)
    }
  }
}
</script>

<style scoped></style>