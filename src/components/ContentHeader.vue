<template>
  <VSheet
    class="d-flex align-center justify-space-between"
    color="background"
    height="36"
  >
    <span> {{ mainMenu.menuNm }} > {{ currentPage.menuNm }} </span>

    <div class="d-flex ga-3">
      <VBtn
        v-for="(button, i) in buttons"
        :key="i"
        :prepend-icon="button.icon"
        :variant="button.variant || 'outlined'"
        :color="button.color"
        @click="button.event"
      >
        {{ button.title }}
      </VBtn>
    </div>
  </VSheet>
  <VDivider class="border-opacity-50 my-2" />
</template>

<script setup>
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';

const { mainMenu, currentPage } = storeToRefs(useMenu());

defineProps({
  buttons: {
    type: Array,
    default: () => []
  }
});
</script>
