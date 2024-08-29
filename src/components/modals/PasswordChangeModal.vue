<template>
  <AppModal
    :visible="visible"
    :model-value="visible"
    max-width="600"
    title="비밀번호 변경"
    @update:model-value="$emit('close')"
    @close="$emit('close')"
  >
    <div class="pa-4">
      <VForm ref="form" class="d-flex flex-column ga-3" @submit.prevent>
        <VTextField
          v-model="currentPassword"
          label="현재 비밀번호"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="passwordAttrs(showCurrentPassword).icon"
          :type="passwordAttrs(showCurrentPassword).type"
          @click:append-inner="toggleCurrentPassword"
          :rules="[currentPasswordRules]"
          clearable
          required
        />
        <VTextField
          v-model="newPassword"
          label="새 비밀번호"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="passwordAttrs(showNewPassword).icon"
          :type="passwordAttrs(showNewPassword).type"
          @click:append-inner="toggleNewPassword"
          :rules="[newPasswordRules]"
          clearable
          required
        />
        <VTextField
          v-model="newCheckPassword"
          label="새 비밀번호 확인"
          variant="outlined"
          prepend-inner-icon="mdi-lock-check-outline"
          :append-inner-icon="passwordAttrs(showNewCheckPassword).icon"
          :type="passwordAttrs(showNewCheckPassword).type"
          @click:append-inner="toggleNewCheckPassword"
          :rules="[newCheckPasswordRules]"
          clearable
          required
        />
        <VBtn
          class="mt-4"
          color="primary"
          type="submit"
          size="large"
          block
          rounded
          :loading="loading"
          @click="handlePasswordChange"
        >
          비밀번호 변경
        </VBtn>
      </VForm>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from '@/components/app/AppModal.vue';
import { passwordChange } from '@/api/user';
import { ref } from 'vue';
import { useUser } from '@/stores/useUser';
import { useFeedback } from '@/stores/useFeedback';

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const loading = ref(false);

// 비밀번호 변경 폼
const form = ref(null);
const currentPassword = ref(null);
const newPassword = ref(null);
const newCheckPassword = ref(null);

// 유효성 검사
let returnCode = 0;
const currentPasswordRules = (v) => {
  if (!v) return '현재 비밀번호를 입력하세요';
  else if (returnCode === 401) return '현재 비밀번호가 틀립니다.';
  else return true;
};

const newPasswordRules = (v) => {
  if (!v) return '비밀번호를 입력하세요';
  else if (v === currentPassword.value) {
    return '현재 비밀번호와 동일합니다.';
  } else return true;
};

const newCheckPasswordRules = (v) => {
  if (!v) return '비밀번호를 입력하세요';
  else if (v !== newPassword.value) {
    return '비밀번호를 확인해주세요';
  } else return true;
};

// 텍스트 숨김 아이콘
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

const userStore = useUser();
const { openFeedback } = useFeedback();

// 비밀번호 변경
const handlePasswordChange = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  try {
    loading.value = true;
    const res = await passwordChange({
      userCode: userStore.user.userCode,
      userPwd: currentPassword.value,
      changeUserPwd: newPassword.value
    });

    returnCode = res.header.code;

    const { valid } = await form.value.validate();
    if (!valid) {
      returnCode = 0;
      return;
    }

    emit('close');

    currentPassword.value = null;
    newPassword.value = null;
    newCheckPassword.value = null;

    await openFeedback(
      'success',
      'SUCCESS',
      '비밀번호가 변경되었습니다. <br /> 다시 로그인해주세요.',
      '',
      '확인'
    );
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
