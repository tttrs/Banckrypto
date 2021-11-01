<template>
  <div class="overflow-x-auto border-gray-200 sm:rounded-lg mt-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mined</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(block) in blocks" :key="block.height">
        <td class="px-4 py-2 whitespace-nowrap">
          <router-link tag="a" :to="{ name: 'blocks', params: { hash: block.hash } }"
            class="text-blue-700 hover:text-blue-900 hover:underline">{{ block.index }}
          </router-link>
        </td>
        <td class="px-4 py-2 whitespace-nowrap">{{ formatDateTime(block.timestamp) }}</td>
        <td class="px-4 py-2 whitespace-nowrap">{{ block.transactions.length }}</td>
        <td class="px-4 py-2 text-sm whitespace-nowrap">{{ getSizeInBytes(block) + ' bytes' }}</td>
      </tr>
      </tbody>
    </table>
    <pagination></pagination>
  </div>
</template>

<script>
import Utils from '../utils'

export default {
  name: "LatestBlocks",
  props: ['blocks'],
  methods: {
    getSizeInBytes(block) {
      return new Intl.NumberFormat().format(Buffer.byteLength(JSON.stringify(block)))
    },
    formatDateTime(val) {
      return Utils.formatDateTime(val)
    }
  }
}
</script>

<style scoped></style>
