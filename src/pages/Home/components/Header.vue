<template>
  <header>
    <h1 class="text-4xl md:text-5xl text-gray-600 dark:text-gray-300">
      {{ settings.projectName }}
    </h1>
    <h1 class="text-xl md:text-2xl text-gray-400 dark:text-gray-300 flex items-center">
      <span>{{ greetings }} &nbsp;&nbsp;</span>
      <span
        v-if="name && !inputMode"
        class="underline cursor-pointer text-xl md:text-2xl leading-none"
        @click="changeInputMode"
      >
        {{ name }}
      </span>
      <input
        v-else
        ref="nameInput"
        v-model="inputName"
        type="text"
        placeholder="请输入您的姓名"
        class="bg-transparent border-0 border-b border-gray-400 dark:border-gray-300 outline-none text-xl md:text-2xl text-gray-400 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-500 placeholder-opacity-60 min-w-0 w-auto leading-none h-auto"
        @keyup.enter="saveName"
        @blur="saveName"
      >
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 dark:text-gray-400">
      {{ currentTime }}
    </p>
    <p class="text-xl md:text-2xl text-gray-300 mt-2 dark:text-gray-400">
      {{ currentYear }}年 已过
      {{ gonePercent }}
    </p>
    <p class="text-4xl leading-snug md:leading-snug md:text-5xl mt-4 dark:text-white">
      <span
        class="cursor-pointer animate__animated animate__fadeInRight"
        @click="getPoetries"
      >
        <!-- {{ poetry }} -->
        123
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
import { Notification } from '@arco-design/web-vue'
import settings from '@/config/settings'
import { ref, watch } from 'vue'

const userStore = useUserStore()
const { name } = storeToRefs(userStore)

const greetings = getGreetings()

const { currentYear, currentTime, gonePercent } = useCurrentTime()

const { poetry, run: getP } = usePoetry()
const getPoetries = useDebounceFn(getP, 200)

const nameInput = ref()
const inputName = ref('')
const inputMode = ref(false)

const changeInputMode = () => {
  inputMode.value = !inputMode.value
  if (inputMode.value) {
    inputName.value = name.value || ''
    nextTick(() => {
      nameInput.value?.focus()
    })
  }
}

const saveName = () => {
  const trimmedName = inputName.value.trim()
  if (trimmedName) {
    userStore.setName(trimmedName)
  }
  inputMode.value = false
  inputName.value = ''
}
const validateName = (value: string) => {
  if (value.length > 10) {
    inputName.value = value.slice(0, 10)
  }
}
watch(inputName, validateName)
</script>

<style lang="scss" scoped></style>
