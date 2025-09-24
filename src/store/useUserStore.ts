export const useUserStore = defineStore('user', {
  state: () => ({
    name: localStorage.getItem('user-name') || '',
    github: 'https://github.com/cuiyiming1998'
  })
})
