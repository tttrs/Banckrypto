<template>
  <modal :show="show" @close="closeModal()">
    <template #title>
      <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
        Private key
      </h3>
    </template>
    <template #content>
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="text-center sm:mt-0 sm:text-left overflow-hidden">
          <div class="max-w-full">
              <span
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-700 bg-red-100 rounded">
                    Warning: Never disclose this key. Anyone with your private keys can steal any assets held in your account.
              </span>
          </div>
          <div class="mt-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">{{ address }}</label>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-gray-700 text-sm font-bold overflow-hidden overflow-ellipsis flex-1">
                {{ key }}</label>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="cursor-pointer h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 inline-block"
                   viewBox="0 0 20 20" fill="currentColor" @click="copyToClipboard(key)">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                <path
                  d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" @click="closeModal()"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm">
          Close
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from './Modal'
import Utils from "@/utils"

export default {
  name: "ShowPrivateKey",
  components: {
    Modal
  },
  data() {
    return {
      show: false,
      address: null,
      key: null
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    copyToClipboard(val) {
      return Utils.copyToClipboard(val, this)
    }
  },
  mounted() {
    this.emitter.on('show-private-key', (args) => {
      this.show = true
      this.address = args.address
      this.key = args.key
    })
  }
}
</script>

<style scoped></style>
