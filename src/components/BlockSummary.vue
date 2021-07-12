<template>
  <div v-if="block">
    <h1 class="text-lg font-bold">Block {{ block.index }}</h1>
    <div class="shadow overflow-hidden border-b border-gray-200 rounded bg-white my-4">
      <div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Hash</div>
          <div class="col-span-3 flex items-center">
            <div class="inline-block overflow-hidden overflow-ellipsis">
              {{ block.hash }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block"
                 viewBox="0 0 20 20" fill="currentColor" @click="copyToClipboard(block.hash)">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Timestamp</div>
          <div class="col-span-3">{{ formatDateTime(block.timestamp) }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Height</div>
          <div class="col-span-3">{{ block.index }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Number of transactions</div>
          <div class="col-span-3">{{ block.transactions.length }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Merkle root</div>
          <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ block.merkleRoot }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Nonce</div>
          <div class="col-span-3">{{ block.nonce }}</div>
        </div>
        <div class="grid grid-cols-4 gap-4 border-b p-2">
          <div class="text-gray-500">Transaction Volume</div>
          <div class="col-span-3">
            <span
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            {{ transactionsVolume + ' ' + currency }}</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-2">
          <div class="text-gray-500">Size</div>
          <div class="col-span-3">{{ block.size + ' bytes' }}</div>
        </div>
      </div>
    </div>
    <h1 class="text-lg font-bold">Block Transactions</h1>
    <div v-for="(transaction) in block.transactions" :key="transaction.hash"
         class="overflow-hidden rounded hover:bg-gray-100 bg-white mt-4">
      <transaction-summary :transaction="transaction" :copy="false" :link="true"></transaction-summary>
    </div>
  </div>
</template>

<script>
import Utils from "../utils"
import TransactionSummary from "./TransactionSummary";

export default {
  name: "BlockSummary",
  components: {TransactionSummary},
  props: ['block'],
  data() {
    return {
      currency: process.env.VUE_APP_CURRENCY
    }
  },
  computed: {
    transactionsVolume() {
      let volume = 0
      if (this.block) {
        this.block.transactions.forEach(t => {
          volume += t.amount
        })
      }
      return volume
    }
  },
  methods: {
    formatDateTime(val) {
      return Utils.formatDateTime(val)
    },
    copyToClipboard(val) {
      return Utils.copyToClipboard(val, this)
    }
  }
}
</script>

<style scoped></style>