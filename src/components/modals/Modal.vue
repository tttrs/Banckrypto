<template>
  <modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
    <div class="px-6 pt-4">
      <div class="text-lg">
        <slot name="title"></slot>
      </div>
    </div>
    <slot name="content"></slot>
  </modal>
</template>

<script>
import Modal from '../Modal'

export default {
  emits: ['close'],

  components: {
    Modal,
  },

  props: {
    show: {
      default: false
    },
    maxWidth: {
      default: '2xl'
    },
    closeable: {
      default: true
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
