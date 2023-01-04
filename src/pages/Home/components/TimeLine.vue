<template>
  <main class="mt-10 w-full">
    <a-timeline direction="horizontal" mode="alternate">
      <a-timeline-item label="2012-08" dot-color="var(--color-fill-4)">
        123123
      </a-timeline-item>
      <a-timeline-item
        label="2017-05"
        dot-color="var(--color-text-3)"
      ></a-timeline-item>
      <a-timeline-item
        label="2018-07"
        dot-color="var(--color-text-3)"
      ></a-timeline-item>
      <a-timeline-item
        label="2018-09"
        dot-color="var(--color-text-3)"
      ></a-timeline-item>
      <a-timeline-item
        label="2018-12"
        dot-color="var(--color-text-3)"
      ></a-timeline-item>
    </a-timeline>
  </main>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request'
  import { getTimeLine } from '@/api/home'

  const { data } = useRequest(getTimeLine, {
    onSuccess(res) {
      console.log(res)
    }
  })
</script>

<style lang="scss" scoped></style>
