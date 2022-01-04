<template>
  <div class="hidden lg:block">
    <div class="flex justify-between px-4 pt-4">
      <div class="flex items-center">
        <span class="text-gray-500 inline-block w-16">Hash</span>
        <template v-if="link && transaction.hash !== '0'">
          <router-link tag="a" :to="{ name: 'transaction', params: { hash: transaction.hash } }"
                       class="text-blue-700 hover:text-blue-900 hover:underline inline-block">{{ transaction.hash }}
          </router-link>
        </template>
        <template v-else>
          {{ transaction.hash }}
        </template>
        <svg v-if="copy" xmlns="http://www.w3.org/2000/svg" @click="copyToClipBoard(transaction.hash)"
             class="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block" viewBox="0 0 20 20"
             fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
        </svg>
      </div>
      <div class="text-right">{{ formatDateTime(transaction.timestamp) }}</div>
    </div>
    <div class="flex justify-between px-4 pt-4">
      <div class="flex items-start">
        <div class="ml-16" v-if="transaction.inputs">
          <router-link tag="a" :to="{ name: 'address', params: { address: transaction.inputs[0].UTXO.address } }"
                       class="text-blue-700 hover:text-blue-900 hover:underline">
            {{ transaction.inputs[0].UTXO.address }}
          </router-link>
          <span
              class="inline-flex ml-2 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            {{ transaction.inputs[0].UTXO.amount + ' ' + currency }}</span>
        </div>
        <span v-else>COINBASE</span>
      </div>
      <div>
        <div v-for="(out) in transaction.outputs" :key="out.id">
          <router-link tag="a" :to="{ name: 'address', params: { address: out.address } }"
                       class="text-blue-700 hover:text-blue-900 hover:underline">{{ out.address }}
          </router-link>
          <span
              class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
              {{ out.amount + ' ' + currency }}</span>
        </div>

      </div>
    </div>
    <div class="text-right px-4 p-4">
      <div v-if="transaction.inputs">
        <template v-if="address || addresses">
          <span v-if="!transaction.inputs || transaction.outputs[0].address === address || (addresses && addresses.indexOf(transaction.outputs[0].address) !== -1)"
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            +{{ transaction.amount + ' ' + currency }}</span>
          <span v-else
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-700 bg-red-100 rounded">
            -{{ transaction.amount + ' ' + currency }}</span>
        </template>
        <span v-else
              class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            {{ transaction.inputs[0].UTXO.amount + ' ' + currency }}</span>
      </div>
    </div>
  </div>
  <div class="block lg:hidden">
    <div class="grid grid-cols-4 gap-4 px-4 pt-4">
      <div class="text-gray-500">Hash</div>
      <div class="col-span-3 overflow-hidden overflow-ellipsis">
        <div v-if="link && transaction.hash !== '0'">
          <router-link tag="a" :to="{ name: 'transaction', params: { hash: transaction.hash } }"
                       class="text-blue-700 hover:text-blue-900 hover:underline">{{ transaction.hash }}
          </router-link>
        </div>
        <div v-else>{{ transaction.hash }}</div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 px-4 pt-4">
      <div class="text-gray-500">Date</div>
      <div class="col-span-3 overflow-hidden overflow-ellipsis">{{ formatDateTime(transaction.timestamp) }}</div>
    </div>
    <div class="grid grid-cols-4 gap-4 px-4 pt-4">
      <div class="text-gray-500">From</div>
      <div class="col-span-3 overflow-hidden overflow-ellipsis">
        <div v-if="transaction.inputs">
          <router-link tag="a" :to="{ name: 'address', params: { address: transaction.inputs[0].UTXO.address } }"
            class="text-blue-700 hover:text-blue-900 hover:underline">
            {{ transaction.inputs[0].UTXO.address }}
          </router-link>
        </div>
        <div v-else>COINBASE</div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 px-4 pt-4">
      <div class="text-gray-500">To</div>
      <div class="col-span-3 overflow-hidden overflow-ellipsis">
        <router-link tag="a" :to="{ name: 'address', params: { address: transaction.outputs[0].address } }"
                     class="text-blue-700 hover:text-blue-900 hover:underline">{{ transaction.outputs[0].address }}
        </router-link>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 px-4 py-4">
      <div class="text-gray-500">Amount</div>
      <div class="col-span-3">
        <template v-if="address">
          <span v-if="!transaction.inputs || transaction.outputs[0].address === transaction.inputs[0].UTXO.address"
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            +{{ transaction.amount + ' ' + currency }}</span>
        </template>
        <span v-else
              class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-700 bg-green-100 rounded">
            {{ transaction.amount + ' ' + currency }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "../utils"

export default {
  name: "TransactionSummary",
  props: ['transaction', 'copy', 'link', 'addresses', 'address'],
  data() {
    return {
      currency: process.env.VUE_APP_CURRENCY
    }
  },
  methods: {
    formatDateTime(val) {
      return Utils.formatDateTime(val)
    },
    copyToClipBoard(val) {
      return Utils.copyToClipboard(val, this)
    }
  }
}
</script>

<style scoped></style>
