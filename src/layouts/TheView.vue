<template>
  <VMain>
    <VContainer v-if="!header" class="h-100" fluid>
      <RouterView />
    </VContainer>

    <VContainer v-else class="px-4 py-2 body-height" fluid>
      <div class="h-100 d-flex flex-column overflow-hidden">
        <RouterView />
      </div>
    </VContainer>
  </VMain>
</template>

<script setup>
import { useLayout } from '@/stores/useLayout';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';

const { header } = storeToRefs(useLayout());
</script>
