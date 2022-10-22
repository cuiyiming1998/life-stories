import { Ref } from "vue"

export const useCurrentTime = (): { currentTime: Ref<string> } => {
  let currentTime = ref<string>('1')

  window.setInterval(() => {
    currentTime.value = `${ new Date().toLocaleDateString()} ${ new Date().toLocaleTimeString() }`
  }, 1000)

  return { currentTime }
}