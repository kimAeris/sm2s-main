<template>
  <VMain>
    <VContainer v-if="!header" class="h-100" fluid>
      <RouterView />
    </VContainer>

    <VContainer v-else class="px-4 py-2 body-height" fluid>
      <div class="d-flex flex-column w-100 h-100 overflow-hidden">
        <RouterView />
      </div>
    </VContainer>
  </VMain>
</template>

<script setup>
import { useLayout } from '@/stores/useLayout';
import { RouterView } from 'vue-router';

const { header } = useLayout();
</script>
