export const useUserStore = defineStore('user', {
  state: () => ({
    name: localStorage.getItem('user-name') || '',
    github: 'https://github.com/cuiyiming1998'
  }),
  actions: {
    setName(name: string) {
      this.name = name
      localStorage.setItem('user-name', name)
    }
  }
})
