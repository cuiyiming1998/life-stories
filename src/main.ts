import '@/assets/tw.css'
import App from './App.vue'
import router from './router'
import 'animate.css'
import '@/styles/index.scss'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
