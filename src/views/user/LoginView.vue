<template>
  <VSheet class="h-100 bg-background pa-12 d-flex" rounded>
    <VCard class="ma-auto px-10 py-8 text-center" min-width="600">
      <VForm validate-on="submit lazy" @submit.prevent="login">
        <h1 class="mb-6 text-primary">SM2S</h1>

        <VTextField label="사업자 번호" clearable />
        <VTextField label="ID" clearable />
        <VTextField label="PW" clearable />

        <VBtn
          class="mt-2"
          color="primary"
          type="submit"
          size="large"
          rounded="lg"
          block
          :loading="loading"
        >
          로그인
        </VBtn>
      </VForm>
    </VCard>
  </VSheet>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const login = () => {
  loading.value = true;
};
</script>
