<template>
  <main
    class="cursor-default flex flex-col justify-center items-start pt-4 pb-20 px-8 md:px-20 animate__animated animate__fadeIn animate__faster"
  >
    <div class="w-full mb-16 flex justify-end items-center gap-x-4">
      <div
        class="text-xl cursor-pointer text-gray-600 dark:text-gray-100"
        @click="handleToggleTheme"
      >
        <icon-sun-fill v-if="theme === 'dark'" />
        <icon-moon-fill v-else />
      </div>
      <div
        class="text-xl cursor-pointer text-gray-600 dark:text-gray-100"
        @click="gotoGithub"
      >
        <icon-github />
      </div>
    </div>
    <h1 class="text-4xl md:text-5xl text-gray-600 dark:text-gray-300">
      Life Stories
    </h1>
    <h1 class="text-xl md:text-2xl text-gray-400 dark:text-gray-300">
      {{ greetings }} {{ name }}
    </h1>
    <div class="text-xl md:text-2xl text-gray-300 dark:text-gray-400">
      {{ currentTime }}
    </div>
    <div class="text-xl md:text-2xl text-gray-300 mt-2 dark:text-gray-400">
      {{ currentYear }}年 已过
      {{ gonePercent }}
    </div>
    <div
      class="text-4xl leading-snug md:leading-snug md:text-5xl mt-4 dark:text-white"
    >
      <span class="cursor-pointer" @click="getPoetries">
        {{ poetry }}
      </span>
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

<style lang="scss" scoped></style>
