<template>
  <AppModal
    :model-value="visible"
    max-width="600"
    title="비밀번호 변경"
    @update:model-value="$emit('close')"
    @close="close"
  >
    <div class="pa-4">
      <VForm ref="loginForm" @submit.prevent>
        <VTextField
          label="현재 비밀번호"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="passwordAttrs(showCurrentPassword).icon"
          :type="passwordAttrs(showCurrentPassword).type"
          @click:append-inner="toggleCurrentPassword"
          clearable
          required
        />
        <VTextField
          label="새 비밀번호"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="passwordAttrs(showNewPassword).icon"
          :type="passwordAttrs(showNewPassword).type"
          @click:append-inner="toggleNewPassword"
          clearable
          required
        />
        <VTextField
          label="새 비밀번호 확인"
          variant="outlined"
          prepend-inner-icon="mdi-lock-check-outline"
          :append-inner-icon="passwordAttrs(showNewCheckPassword).icon"
          :type="passwordAttrs(showNewCheckPassword).type"
          @click:append-inner="toggleNewCheckPassword"
          clearable
          required
        />
      </VForm>
      <VBtn
        class="w-100 mt-4"
        color="primary"
        type="submit"
        size="large"
        rounded
      >
        비밀번호 변경
      </VBtn>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from '@/components/app/AppModal.vue';
import { ref } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showNewCheckPassword = ref(false);

const toggleCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};
const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value;
};
const toggleNewCheckPassword = () => {
  showNewCheckPassword.value = !showNewCheckPassword.value;
};
const passwordAttrs = (isShow) => {
  if (isShow) {
    return {
      icon: 'mdi-eye',
      type: 'text'
    };
  } else {
    return {
      icon: 'mdi-eye-off',
      type: 'password'
    };
  }
};
</script>
