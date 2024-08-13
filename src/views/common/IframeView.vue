<template>
  <iframe :src="url" width="100%" height="100%" frameborder="0" allowfullscreen>
  </iframe>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true
  }
});
</script>
