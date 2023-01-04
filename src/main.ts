import '@/assets/tw.css'
import App from './App.vue'
import router from './router'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import 'animate.css'
import '@/styles/index.scss'
import settings from './config/settings'
import './mock'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ArcoVueIcon)

app.mount('#app')
