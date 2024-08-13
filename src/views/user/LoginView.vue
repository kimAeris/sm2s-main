<template>
  <VSheet class="h-100 bg-background pa-12 d-flex" rounded>
    <VCard class="ma-auto px-10 py-8 text-center" min-width="600">
      <VForm validate-on="submit lazy" @submit.prevent="login">
        <h4 class="mb-6 text-primary font-weight-bold">SM2S</h4>

        <VTextField label="사업자 번호" clearable />
        <VTextField label="ID" clearable />
        <VTextField
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="PW"
          clearable
          @click:append-inner="visible = !visible"
        />

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
import router from '@/router';
import { ref } from 'vue';

const loading = ref(false);
const visible = ref(false);

const login = () => {
  loading.value = true;

  try {
    router.replace({ name: 'CommonCode' });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
