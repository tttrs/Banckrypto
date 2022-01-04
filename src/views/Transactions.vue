<template>
  <div v-if="!isLoading">
    <template v-if="transactions.length > 0">
      <div v-for="(transaction) in transactions" :key="transaction.hash"
           class="overflow-hidden rounded hover:bg-gray-100 bg-white mt-4">
        <transaction-summary :transaction="transaction" :addresses="addresses"></transaction-summary>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center h-72">
        <div class="text-center">
          <h1 class="text-lg font-medium mb-2">Transactions</h1>
          <p>All your {{ currency }} transactions will show up here.</p>
        </div>
      </div>
    </template>
  </div>
  <loader :loading="isLoading"></loader>
</template>

<script>
import {mapGetters} from "vuex"
import axios from "axios"
import TransactionSummary from "@/components/TransactionSummary"
import Loader from "@/components/Loader"

export default {
  name: "Transactions",
  components: {Loader, TransactionSummary},
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      transactions: [],
      isLoading: false,
      currency: process.env.VUE_APP_CURRENCY
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'wallets'
    ]),
    addresses() {
      const addresses = []
      this.wallets.forEach(w => {
        addresses.push(w.address)
      })
      return addresses
    }
  },
  methods: {
    getWalletTransactions() {
      this.isLoading = true
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'transactions',
        params: null
      }), {
        headers: {
          Authorization: 'Basic ' + this.token
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.error) {
          this.$toast.error(response.data.error)
          if (response.data.error.toLowerCase() === 'unauthorized') {
            // logout
            this.emitter.emit('logout')
          }
        } else {
          this.transactions = response.data.result
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getWalletTransactions()
  }
}
</script>

<style scoped></style>
