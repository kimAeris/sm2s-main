<template>
  <VDialog v-model="feedback" max-width="400">
    <VCard class="align-center pa-6 ga-4" rounded="xl" elevation="8">
      <VIcon
        :icon="getIcon(type)"
        size="x-large"
        style="font-size: 100px"
        :color="type"
      />
      <h4 :class="`font-weight-bold text-${type}`">{{ title }}</h4>
      <h6 v-html="message" class="text-center"></h6>

      <div class="d-flex ga-4 mt-4">
        <VBtn v-if="cancelText" @click="cancel"> {{ cancelText }} </VBtn>
        <VBtn v-if="confirmText" :color="type" @click="confirm">
          {{ confirmText }}
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script setup>
import { useFeedback } from '@/stores/useFeedback';
import { getIcon } from '@/utils/common';
import { storeToRefs } from 'pinia';

const { feedback, type, title, message, cancelText, confirmText } =
  storeToRefs(useFeedback());
const { confirm, cancel } = useFeedback();
</script>
