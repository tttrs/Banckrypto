<template>
  <div v-if="!isLoading">
    <div v-for="(transaction) in transactions" :key="transaction.hash"
         class="overflow-hidden rounded hover:bg-gray-100 bg-white mt-4">
      <transaction-summary :transaction="transaction"></transaction-summary>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import axios from "axios"
import TransactionSummary from "@/components/TransactionSummary"

export default {
  name: "Transactions",
  components: {TransactionSummary},
  data() {
    return {
      baseUrl: process.env.VUE_APP_WALLET_URL,
      transactions: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
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
