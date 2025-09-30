<template>
  <main
    class="w-full h-full cursor-default flex flex-col gap-y-8 justify-center items-start pb-20 px-8 md:px-20 animate__animated animate__fadeIn animate__faster"
  >
    <Header />
    <TimeLine />
  </main>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import TimeLine from './components/TimeLine.vue'
</script>

<style lang="scss" scoped></style>
