<template>
  <iframe
    :src="iframeUrl"
    width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
  >
  </iframe>
</template>

<script setup>
defineProps({
  iframeUrl: {
    type: String,
    required: true
  }
});
</script>
