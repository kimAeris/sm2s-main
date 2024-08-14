<template>
  <VMain>
    <VContainer class="px-4 py-2 body-height" fluid>
      <div class="d-flex flex-column w-100 h-100 overflow-hidden">
        <RouterView />
      </div>
    </VContainer>
  </VMain>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
