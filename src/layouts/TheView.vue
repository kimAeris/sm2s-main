<template>
  <VMain>
    <VContainer v-if="!header" class="h-100" fluid>
      <RouterView />
    </VContainer>

    <VContainer
      v-else
      class="body-height"
      :class="!isIframe ? 'pa-4' : 'pa-0'"
      fluid
    >
      <div class="h-100 d-flex flex-column overflow-hidden">
        <RouterView />
      </div>
    </VContainer>
  </VMain>
</template>

<script setup>
import { useLayout } from '@/stores/useLayout';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const { header } = storeToRefs(useLayout());
const route = useRoute();

const isIframe = ref(route.name === 'IframeView');
watch(route, (newRoute) => {
  isIframe.value = newRoute.name === 'IframeView'; // 라우트가 변경될 때 isIframe 상태 업데이트
});
</script>
