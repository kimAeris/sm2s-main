<template>
  <VDialog class="h-100" :model-value="visible">
    <VCard class="flex-grow-1 h-100" rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <span class="text-h6 ml-2">{{ title }}</span>
        </div>

        <VBtn icon="mdi-close" variant="text" @click="$emit('close')"></VBtn>
      </VCardTitle>

      <VDivider></VDivider>

      <VCardText class="d-grid overflow-hidden">
        <slot />
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>
