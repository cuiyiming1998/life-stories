<template>
  <main
    class="cursor-default flex flex-col justify-center items-start pb-20 px-8 md:px-20 animate__animated animate__fadeIn animate__faster"
  >
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
      <span class="cursor-pointer" @click="getPoetries">
        {{ poetry }}
      </span>
    </p>
  </main>
</template>

<script lang="ts" setup>
  import { getGreetings } from '../shared/getGreetings'
  import { useUserStore } from '../store/useUserStore'
  import { useCurrentTime } from '../hooks/useCurrentTime'
  import { usePoetry } from '../hooks/usePoetry'
  import { debounce } from 'lodash-es'
  import settings from '@/config/settings.json'

  const user = useUserStore()
  const { name } = storeToRefs(user)

  const greetings = getGreetings()

  const { currentYear, currentTime, gonePercent } = useCurrentTime()

  const { poetry, run: getP } = usePoetry()
  const getPoetries = debounce(getP, 200)
</script>

<style lang="scss" scoped></style>
