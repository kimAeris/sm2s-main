<template>
  <VApp>
    <TheHeader />
    <TheSideBar />
    <TheView />
    <AppToast />
    <AppFeedback />
  </VApp>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheSideBar from '@/layouts/TheSideBar.vue';
import TheView from '@/layouts/TheView.vue';
import AppToast from './components/app/AppToast.vue';
import AppFeedback from './components/app/AppFeedback.vue';
</script>

<style scoped></style>
