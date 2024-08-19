<template>
  <VDialog>
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- <VIcon icon="mdi-folder-marker" size="small"></VIcon> -->
          <span class="text-h6 ml-2">{{ title }}</span>
        </div>

        <VBtn icon="mdi-close" variant="text" @click="close"></VBtn>
      </VCardTitle>

      <VDivider></VDivider>

      <VCardText>
        <VContainer>
          <slot />
        </VContainer>
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

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>
