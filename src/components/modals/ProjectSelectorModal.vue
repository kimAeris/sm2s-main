<template>
  <VDialog :model-value="visible" @update:model-value="close" max-width="600">
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- <VIcon icon="mdi-folder-marker" size="small"></VIcon> -->
          <span class="text-h6 ml-2">프로젝트 목록</span>
        </div>

        <VBtn icon="mdi-close" variant="text" @click="close"></VBtn>
      </VCardTitle>

      <VDivider></VDivider>

      <VCardText>
        <VContainer>
          <VRow align="center">
            <VCol cols="6" class="pa-5" v-for="menu in list" :key="menu.code">
              <VBtn
                class="w-100"
                elevation="4"
                size="x-large"
                :variant="project.name === menu.name ? 'tonal' : undefined"
                :color="project.name === menu.name ? 'primary' : undefined"
                @click="emit('selectProject', menu)"
              >
                {{ menu.name }}
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';

defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  list: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close', 'selectProject']);

const { project } = storeToRefs(useUser());

const close = () => {
  emit('close');
};
</script>
