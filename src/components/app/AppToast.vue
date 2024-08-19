<template>
  <VSnackbar v-model="visible" :color="type" variant="tonal" timeout="3000">
    <VIcon :icon="getIcon(type)" class="mr-1" />
    {{ message }}
  </VSnackbar>
</template>

<script setup>
import { useToast } from '@/stores/useToast';
import { storeToRefs } from 'pinia';
import { getIcon } from '@/utils/common';

const { visible, message, type } = storeToRefs(useToast());
</script>
