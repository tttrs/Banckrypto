<template>
  <search></search>
  <loader :loading="isLoading"></loader>
  <div v-if="!isLoading">
    <template v-if="block">
      <block-summary :block="block"></block-summary>
    </template>
    <template v-if="blocks.length > 0 && block === null">
      <h1 class="text-lg font-bold">Blocks</h1>
      <latest-blocks :blocks="blocks"></latest-blocks>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import BlockSummary from "../components/BlockSummary"
import Search from "../components/Search"
import Loader from "../components/Loader";
import LatestBlocks from "@/components/LatestBlocks";

export default {
  name: "Blocks",
  components: {LatestBlocks, Loader, Search, BlockSummary},
  data() {
    return {
      baseUrl: process.env.VUE_APP_EXPLORER_URL,
      blocks: [],
      block: null,
      page: "1",
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
    getPaginatedBlocks() {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'latestblocks',
        params: [this.page]
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.blocks = response.data.result.filter(b => b.index !== 0)
        this.block = null
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    search(hash) {
      axios.post(`${this.baseUrl}`, JSON.stringify({
        method: 'search',
        params: [hash]
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.block = response.data.result
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        this.block = null
        console.log(error)
      })
    }
  },
  mounted() {
    if (this.$route.params.hash) {
      this.search(this.$route.params.hash)
    } else {
      // Get paginated blocks
      this.getPaginatedBlocks()
    }
  }
}
</script>

<style scoped></style>
