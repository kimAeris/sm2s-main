<template>
  <VSheet class="flex-grow-1 overflow-hidden">
    <div class="d-flex flex-column ga-2 h-100">
      <div class="d-flex align-center justify-space-between">
        <h6>목록</h6>
        <div class="d-flex ga-3">
          <VBtn
            v-for="(button, i) in buttons"
            :key="i"
            :prepend-icon="button.icon"
            :variant="button.variant || 'outlined'"
            :color="button.color"
            rounded="xl"
            @click="button.event"
          >
            {{ button.title }}
          </VBtn>
        </div>
      </div>
      <VDivider />

      <slot />
    </div>
  </VSheet>
</template>

<script setup>
defineProps({
  buttons: {
    type: Array,
    default: () => []
  }
});
</script>
