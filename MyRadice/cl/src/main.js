import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router/router'
import store from './components/store/store'
import Toaster from '@meforma/vue-toaster';






const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toaster, {
    // One of the options
    position: 'top'
  })
  app.mount('#app')
