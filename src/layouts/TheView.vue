<template>
  <VMain>
    <VContainer class="px-4 py-2 body-height" fluid>
      <RouterView />
    </VContainer>
  </VMain>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
