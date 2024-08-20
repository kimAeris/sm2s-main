<template>
  <VSnackbar v-model="visible" :color="type" variant="tonal" timeout="3000">
    <div class="d-flex align-center">
      <VIcon :icon="getIcon(type)" class="mr-2" />
      <span class="text-body-1">{{ message }}</span>
    </div>
  </VSnackbar>
</template>

<script setup>
import { useToast } from '@/stores/useToast';
import { storeToRefs } from 'pinia';
import { getIcon } from '@/utils/common';

const { visible, message, type } = storeToRefs(useToast());
</script>
