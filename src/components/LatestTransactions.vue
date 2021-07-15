<template>
  <div class="overflow-x-auto border-gray-200 sm:rounded-lg mt-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
          Hash
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
          Time
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
          Amount ({{ currency }})
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(transaction) in latestTransactions" :key="transaction.hash">
        <td class="px-4 py-2 whitespace-nowrap">
          <router-link tag="a" :to="{ name: 'transaction', params: { hash: transaction.hash } }"
                       class="text-blue-700 hover:text-blue-900 hover:underline">
            <p class="w-24 xxl:w-64 overflow-ellipsis overflow-hidden block">
              {{ transaction.hash }}
            </p>
          </router-link>
        </td>
        <td class="px-4 py-2 whitespace-nowrap">{{ formatDateTime(transaction.timestamp) }}</td>
        <td class="px-4 py-2 whitespace-nowrap">{{ transaction.amount + ' (' + currency + ')' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Utils from '../utils'

export default {
  name: "LatestTransactions",
  props: ['blocks'],
  data() {
    return {
      currency: process.env.VUE_APP_CURRENCY
    }
  },
  computed: {
    latestTransactions() {
      let transactions = []
      if (this.blocks.length > 0) {
        this.blocks.forEach(b => {
          b.transactions.forEach(t => {
            if (transactions.length < 20) {
              transactions.push(t)
            }
          })
        })
      }
      return transactions
    }
  },
  methods: {
    formatDateTime(val) {
      return Utils.formatDateTime(val)
    }
  }
}
</script>

<style scoped></style>
