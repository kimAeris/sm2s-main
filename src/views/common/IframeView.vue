<template>
  <iframe :src="url" width="100%" height="100%" frameborder="0" allowfullscreen>
  </iframe>
</template>

<script setup>
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const { project } = storeToRefs(useUser());

const props = defineProps({
  scrId: {
    type: String,
    required: true
  }
});

const url = ref(`${project.value.url}#${props.scrId}`);

watch(
  () => props.scrId,
  (newScrId) => {
    url.value = `${project.value.url}#${newScrId}`;
  }
);
</script>
