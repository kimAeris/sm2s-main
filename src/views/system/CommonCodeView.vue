<template>
  <IframeView :src="url" />
</template>

<script setup>
import IframeView from '@/components/IframeView.vue';

const url = `http://221.151.122.208:11005/?Pro=%EA%B3%B5%EB%B0%A9#BI_001`;
</script>

<style scoped></style>
