<template>
  <div class="flex-1 flex flex-col items-center pt-10 md:pt-20">
    <main class="flex flex-col justify-center items-center gap-y-4">
      <div
        class="flex justify-center items-center cursor-default rounded-full text-6xl font-bold w-40 h-40 border-2 border-solid border-gray-600 dark:border-gray-200"
      >
        <a-typography-text>!</a-typography-text>
      </div>
      <p class="text-3xl">
        <a-typography-text>Oops!</a-typography-text>
      </p>
      <p class="text-xl">
        <a-typography-text>您似乎来到了一个未知的世界...</a-typography-text>
      </p>
      <p class="text-md">
        <a-typography-text type="secondary">
          链接地址是否正确?
        </a-typography-text>
      </p>
      <a-button class="mt-4" status="normal" @click="returnToHome">
        返回首页({{ countdown }})
      </a-button>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { useCountdown } from '@/hooks/useCountdown'

  const returnToHome = () => {
    router.replace('/')
  }
  const { countdown } = useCountdown(5000, returnToHome)

  const router = useRouter()
</script>
