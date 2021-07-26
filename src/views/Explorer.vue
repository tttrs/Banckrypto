<template>
  <div>

    <search></search>

    <div class="w-full md:grid md:grid-cols-2 md:gap-4">
      <!-- Blocks -->
      <div class="w-full mb-4">
        <h1 class="text-lg font-bold">Latest Blocks</h1>
        <p class="text-sm text-gray-600">The most recently mined blocks</p>
        <latest-blocks :blocks="blocks.slice(0, 5)"></latest-blocks>
        <div class="mt-3" v-if="blocks.length > 5">
          <router-link tag="a" :to="{ name: 'blocks' }"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">View All Blocks</router-link>
        </div>
      </div>

      <!-- Transactions -->
      <div class="w-full mb-4">
        <h1 class="text-lg font-bold">Latest Transactions</h1>
        <p class="text-sm text-gray-600">The most recently transactions</p>
        <latest-transactions :blocks="blocks"></latest-transactions>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Search from "../components/Search"
import LatestTransactions from "../components/LatestTransactions"
import LatestBlocks from "../components/LatestBlocks"

export default {
  name: "Explorer",
  components: {LatestBlocks, LatestTransactions, Search},
  data() {
    return {
      baseUrl: process.env.VUE_APP_EXPLORER_URL,
      blocks: []
    }
  },
  methods: {
    getLatestBlocks() {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: "latestblocks",
        params: []
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.blocks = response.data.result.filter(b => b.index !== 0)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getLatestBlocks()
  }
}
</script>

<style scoped></style>
