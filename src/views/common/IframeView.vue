<template>
  <iframe
    :id="iframeId"
    :src="url"
    width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
  >
  </iframe>
</template>

<script setup>
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

const { project } = storeToRefs(useUser());

const props = defineProps({
  scrId: {
    type: String,
    required: true
  }
});

const iframeId = ref(props.scrId);
const url = ref(`${project.value.url}#${props.scrId}`);

onMounted(() => {
  sendIframe();

  window.addEventListener('message', sendIframe);
});

onUnmounted(() => {
  window.removeEventListener('message', sendIframe);
});

const sendIframe = async () => {
  await nextTick();

  const iframe = document.getElementById(`${iframeId.value}`);
  if (iframe) {
    iframe.contentWindow.postMessage(
      JSON.stringify(localStorage.getItem('user')),
      url.value
    );
  }
};

watch(
  () => props.scrId,
  (newScrId) => {
    url.value = `${project.value.url}#${newScrId}`;
    iframeId.value = newScrId;

    sendIframe();
  }
);
</script>
