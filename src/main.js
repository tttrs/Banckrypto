import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster'
import mitt from 'mitt'
import './index.css'

const app = createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
app.config.globalProperties.emitter = mitt()
app.mount('#app')
