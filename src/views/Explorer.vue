<template>
  <div>
    <div class="flex justify-end py-4">
      <div class="pt-2 relative text-gray-600 w-full md:w-2/5">
        <input class="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
               type="search" name="search" placeholder="Search your transaction, an address or a block">
        <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
               viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
               width="512px" height="512px">
            <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- Blocks -->
      <div class="w-full">
        <h1 class="text-lg font-bold">Latest Blocks</h1>
        <p class="text-sm text-gray-600">The most recently mined blocks</p>
        <table class="w-full table-auto text-left mt-4">
          <thead>
          <tr>
            <th class="text-sm text-gray-600 font-normal">Height</th>
            <th class="text-sm text-gray-600 font-normal">Mined</th>
            <th class="text-sm text-gray-600 font-normal">Transactions</th>
            <th class="text-sm text-gray-600 font-normal">Size</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(block) in blocks" :key="block.height">
            <td class="text-sm font-normal">{{ block.index }}</td>
            <td class="text-sm font-normal">{{ formatDateTime(block.timestamp) }}</td>
            <td class="text-sm font-normal">{{ block.transactions.length }}</td>
            <td class="text-sm font-normal">{{ getSizeInBytes(block) + ' bytes' }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Transactions -->
      <div class="w-full">
        <h1 class="text-lg font-bold">Latest Transactions</h1>
        <p class="text-sm text-gray-600">The most recently transactions</p>
        <table class="w-full table-auto text-left mt-4">
          <thead>
          <tr>
            <th class="text-sm text-gray-600 font-normal">Hash</th>
            <th class="text-sm text-gray-600 font-normal">Time</th>
            <th class="text-sm text-gray-600 font-normal">Amount (vPKR)</th>
            <th class="text-sm text-gray-600 font-normal">Amount (USD)</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: "Explorer",
  data() {
    return {
      baseUrl: 'http://localhost:8080/coinectar/explorer',
      blocks: []
    }
  },
  methods: {
    getLatestBlocks() {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: "latestblocks"
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.blocks = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getSizeInBytes(block) {
      return new Intl.NumberFormat().format(Buffer.byteLength(JSON.stringify(block)))
    },
    formatDateTime(val) {
      if ((moment().valueOf() - val) / (1000 * 60 * 60) < 24) {
        return moment(val).fromNow()
      }
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted() {
    this.getLatestBlocks()
  }
}
</script>

<style scoped></style>
