<template>
  <main
    class="cursor-default flex flex-col justify-center items-start pt-4 pb-20 px-20 animate__animated animate__fadeIn animate__faster"
  >
    <div class="w-full mb-16 flex justify-end items-center gap-x-4">
      <icon-sun
        v-if="theme === 'dark'"
        class="w-5 h-5 cursor-pointer"
        @click="handleToggleTheme"
      />
      <icon-moon
        v-else
        class="w-5 h-5 cursor-pointer"
        @click="handleToggleTheme"
      />
      <icon-github class="w-5 h-5 cursor-pointer" @click="gotoGithub" />
    </div>
    <h1 class="text-5xl text-gray-600">Life Stories</h1>
    <h1 class="text-2xl text-gray-400">{{ greetings }} {{ name }}</h1>
    <div class="text-2xl text-gray-300">
      {{ currentTime }}
    </div>
    <div class="text-2xl text-gray-300 mt-2">
      {{ currentYear }}年 已过
      {{ gonePercent }}
    </div>
    <div
      class="text-5xl text-gray-700 mt-4 cursor-pointer"
      @click="getPoetries"
    >
      {{ poetry }}
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { getGreetings } from '../shared/getGreetings'
  import { useUserStore } from '../store/useUserStore'
  import { useCurrentTime } from '../hooks/useCurrentTime'
  import { usePoetry } from '../hooks/usePoetry'
  import { useAppStore } from '@/store'
  import { debounce } from 'lodash-es'

  // 主题配置
  const appStore = useAppStore()
  const theme = computed(() => appStore.theme)
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      appStore.toggleTheme(dark)
    }
  })
  const toggleTheme = useToggle(isDark)
  const handleToggleTheme = () => {
    toggleTheme()
  }

  const user = useUserStore()
  const { name } = storeToRefs(user)

  const greetings = getGreetings()

  const { currentYear, currentTime, gonePercent } = useCurrentTime()

  const { poetry, run: getP } = usePoetry()
  const getPoetries = debounce(getP, 200)

  const gotoGithub = () => {
    window.open(appStore.github)
  }
</script>
