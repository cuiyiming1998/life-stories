<template>
  <Nav />
  <router-view />
</template>

<script lang="ts" setup>
  import Nav from '@/components/Nav.vue'
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    min-width: 100vw;
    background-color: var(--background-base);
  }
</style>
