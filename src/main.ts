import '@/assets/tw.css'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import 'animate.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
