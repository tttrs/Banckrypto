<template>
  <search></search>
  <loader :loading="isLoading"></loader>
  <div v-if="!isLoading">
    <template v-if="transaction">
      <h1 class="text-lg font-bold">Summary</h1>
      <div class="overflow-hidden rounded hover:bg-gray-100 bg-white mt-4">
        <transaction-summary :transaction="transaction" :copy="true" :link="false"></transaction-summary>
      </div>
      <h1 class="text-lg font-bold mt-4">Detail</h1>
      <div class="overflow-hidden border-gray-200 rounded bg-white my-4">
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Hash</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ transaction.hash }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Received Time</div>
          <div class="col-span-3 overflow-hidden">{{ transaction.timestamp }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Included in Block</div>
          <div class="col-span-3 overflow-hidden">
            <router-link tag="a" :to="{ name: 'blocks', params: { hash: transaction.blockHash } }"
                         class="text-blue-700 hover:text-blue-900 hover:underline">
              {{ transaction.blockId }}
            </router-link>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Total Input</div>
          <div class="col-span-3 overflow-hidden">{{ transaction.inputs[0].UTXO.amount + ' ' + currency }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-2">
          <div class="text-gray-500">Total Output</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">
            {{ transaction.outputs[0].amount + transaction.outputs[1].amount + ' ' + currency }}
          </div>
        </div>
      </div>
      <h1 class="text-lg font-bold">Inputs</h1>
      <div class="overflow-hidden border-gray-200 rounded bg-white my-4 hover:bg-gray-100">
        <div class="grid grid-cols-4 gap-4 p-2">
          <div class="text-gray-500">Index</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">0</div>
        </div>
        <div class="grid grid-cols-4 gap-4 px-2 pb-2">
          <div class="text-gray-500">Address</div>
          <div class="col-span-3 lg:col-span-2 flex items-center">
            <div class="inline-block overflow-hidden overflow-ellipsis">
              <router-link tag="a" :to="{ name: 'address', params: { address: transaction.inputs[0].UTXO.address } }"
                           class="text-blue-700 hover:text-blue-900 hover:underline">
                {{ transaction.inputs[0].UTXO.address }}
              </router-link>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block"
                 viewBox="0 0 20 20" fill="currentColor" @click="copyToClipboard(transaction.inputs[0].UTXO.address)">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
            </svg>
          </div>
          <div class="col-span-4 lg:flex lg:justify-between lg:col-span-1">
            <span class="inline-block w-24 lg:w-28">Value</span> {{ transaction.inputs[0].UTXO.amount + ' ' + currency }}
          </div>
        </div>
      </div>
      <h1 class="text-lg font-bold">Outputs</h1>
      <div class="overflow-hidden border-gray-200 rounded bg-white my-4">
        <div v-for="(output, index) in transaction.outputs" :key="output.id"
             class="border-b hover:bg-gray-100">
          <div class="grid grid-cols-4 gap-4 p-2">
            <div class="text-gray-500">Index</div>
            <div class="col-span-3 lg:col-span-2 overflow-hidden overflow-ellipsis">{{ index }}</div>
            <div class="col-span-4 lg:flex lg:justify-between lg:col-span-1">
              <span class="inline-block w-24 lg:w-28">Details</span>
<!--              <span :class="[ index === 1 ? 'text-red-500' : '' ]">{{ index === 0 ? 'Unspent' : 'Spent' }}</span>-->
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 px-2 pb-2">
            <div class="text-gray-500">Address</div>
            <div class="col-span-3 lg:col-span-2 flex items-center">
              <div class="inline-block overflow-hidden overflow-ellipsis">
                <router-link tag="a" :to="{ name: 'address', params: { address: output.address } }"
                             class="text-blue-700 hover:text-blue-900 hover:underline">
                  {{ output.address }}
                </router-link>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block"
                   viewBox="0 0 20 20" fill="currentColor" @click="copyToClipboard(output.address)">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </div>
            <div class="col-span-4 lg:flex lg:justify-between lg:col-span-1">
              <span class="inline-block w-24 lg:w-28">Value</span>
              <span>{{ output.amount + ' ' + currency }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h1 class="text-lg font-bold">Blocks</h1>
    </template>
  </div>
</template>

<script>
import axios from "axios"
import Utils from '../utils'
import Search from "../components/Search"
import TransactionSummary from "../components/TransactionSummary"
import Loader from "../components/Loader"

export default {
  name: "Transaction",
  components: {Loader, TransactionSummary, Search},
  data() {
    return {
      baseUrl: process.env.VUE_APP_EXPLORER_URL,
      currency: process.env.VUE_APP_CURRENCY,
      transactions: [],
      transaction: null,
      isLoading: true
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.hash && to.params.hash !== from.params.hash) {
        this.search(to.params.hash)
      }
    }
  },
  methods: {
    search(hash) {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'search',
        params: [hash]
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.transaction = response.data.result
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        this.transaction = null
        console.log(error)
      })
    },
    copyToClipboard(val) {
      return Utils.copyToClipboard(val, this)
    }
  },
  mounted() {
    if (this.$route.params.hash) {
      this.search(this.$route.params.hash)
    }
  }
}
</script>

<style scoped></style>
