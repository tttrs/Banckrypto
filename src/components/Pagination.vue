<template>
  <div class="mt-4" v-if="meta.pages > 1">
    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer">
      <a class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{'disabled' : meta.page === 1 }" @click="changePage(1)">
        First
      </a>
      <template v-for="page in meta.pages" :key="page">
        <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            v-if="from < page && page < to" :class="{'z-10 border-green-500 text-green-500': meta.page === page}"
           @click="changePage(page)">{{ page }}
        </a>
      </template>
      <a class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{'disabled': meta.page === meta.pages}" @click="changePage(meta.pages)">
        Last
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['meta'],
  emits: ['pageChanged'],
  data() {
    return {
      linkLimit: 7
    }
  },
  computed: {
    halfTotalLinks() {
      return Math.floor(this.linkLimit / 2)
    },
    from() {
      let from = this.meta.page - this.halfTotalLinks
      if (this.meta.pages - this.meta.page < this.halfTotalLinks) {
        from -= this.halfTotalLinks - (this.meta.pages - this.meta.page) - 1
      }
      return from
    },
    to() {
      let to = this.meta.page + this.halfTotalLinks
      if (this.meta.page < this.halfTotalLinks) {
        to += this.halfTotalLinks - this.meta.page
      }
      return to
    }
  },
  methods: {
    changePage(page) {
      this.$emit('pageChanged', page);
    }
  }
}
</script>

<style scoped></style>
