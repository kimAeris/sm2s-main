<template>
  <VApp>
    <TheHeader />
    <TheSideBar />
    <TheView />
    <AppToast />
  </VApp>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheSideBar from '@/layouts/TheSideBar.vue';
import TheView from '@/layouts/TheView.vue';
import AppToast from './components/app/AppToast.vue';
</script>

<style scoped></style>
