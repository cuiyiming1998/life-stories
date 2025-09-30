<template>
  <nav class="w-full py-4 px-5 sm:px-10 md:px-20 flex justify-end items-center gap-x-4">
    <!-- <div class="text-xl cursor-pointer text-gray-600 dark:text-gray-100" @click="handleToggleTheme">
      <IconSettings />
    </div> -->
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
  </nav>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'

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

const gotoGithub = () => {
  window.open(appStore.github)
}
</script>

<style lang="scss" scoped></style>
