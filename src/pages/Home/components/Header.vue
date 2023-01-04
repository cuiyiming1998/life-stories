<template>
  <header>
    <h1 class="text-4xl md:text-5xl text-gray-600 dark:text-gray-300">
      {{ settings.projectName }}
    </h1>
    <h1 class="text-xl md:text-2xl text-gray-400 dark:text-gray-300">
      {{ greetings }} {{ name }}
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 dark:text-gray-400">
      {{ currentTime }}
    </p>
    <p class="text-xl md:text-2xl text-gray-300 mt-2 dark:text-gray-400">
      {{ currentYear }}年 已过
      {{ gonePercent }}
    </p>
    <p
      class="text-4xl leading-snug md:leading-snug md:text-5xl mt-4 dark:text-white"
    >
      <span
        class="cursor-pointer animate__animated animate__fadeInRight"
        @click="getPoetries"
      >
        {{ poetry }}
      </span>
    </p>
  </header>
</template>

<script lang="ts" setup>
  import { getGreetings } from '@/shared/getGreetings'
  import { useUserStore } from '@/store/useUserStore'
  import { useCurrentTime } from '@/hooks/useCurrentTime'
  import { usePoetry } from '@/hooks/usePoetry'
  import { useDebounceFn } from '@vueuse/core'
  import settings from '@/config/settings'

  const user = useUserStore()
  const { name } = storeToRefs(user)

  const greetings = getGreetings()

  const { currentYear, currentTime, gonePercent } = useCurrentTime()

  const { poetry, run: getP } = usePoetry()
  const getPoetries = useDebounceFn(getP, 200)
</script>

<style lang="scss" scoped></style>
