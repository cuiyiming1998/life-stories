import defaultSettings from '@/config/settings'
import { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  actions: {
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.documentElement.classList.add('dark') // tailwind
        document.body.setAttribute('arco-theme', 'dark') // arco
      } else {
        this.theme = 'light'
        document.documentElement.classList.remove('dark') // tailwind
        document.body.removeAttribute('arco-theme') // arco
      }
    }
  }
})

export default useAppStore
