<template>
  <VSheet class="w-100 h-100 bg-background pa-12 d-flex" rounded>
    <VCard class="ma-auto px-12 py-8" min-width="600" elevation="12">
      <VForm ref="loginForm" @submit.prevent>
        <h4 class="mb-6 text-primary text-center font-weight-bold">SM2S</h4>

        <div class="d-flex flex-column ga-2">
          <VTextField
            v-model="businessNumber"
            label="사업자 번호"
            variant="outlined"
            clearable
            prepend-inner-icon="mdi-domain"
            placeholder="000-00-00000"
            maxlength="12"
            @input="formatBusinessNumber"
            required
            :rules="[businessRules]"
          />
          <VTextField
            v-model="id"
            label="ID"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            clearable
            required
            :rules="[(v) => !!v || 'ID를 입력하세요']"
          />
          <VTextField
            v-model="pw"
            label="PW"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            clearable
            required
            :rules="[(v) => !!v || 'PW를 입력하세요']"
            @click:append-inner="visible = !visible"
          />
        </div>

        <VCheckbox
          v-model="isInfoSave"
          label="로그인 정보 저장"
          density="compact"
          hide-details
        />

        <VBtn
          class="mt-2"
          color="primary"
          type="submit"
          size="large"
          rounded="lg"
          block
          :loading="loading"
          @click="handleLogin"
        >
          로그인
        </VBtn>
      </VForm>
    </VCard>
  </VSheet>
</template>

<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import { login } from '@/api/common';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { useToast } from '@/stores/useToast';

const { accessToken, user } = storeToRefs(useUser());
const { newToast } = useToast();

const loading = ref(false);
const visible = ref(false);

const loginForm = ref(null);

const businessNumber = ref(null);
const id = ref(null);
const pw = ref(null);

const formatBusinessNumber = () => {
  let rawValue = businessNumber.value.replace(/[^0-9-]/g, '');

  if (rawValue.length === 3 || rawValue.length === 6) {
    rawValue += '-';
  }

  businessNumber.value = rawValue;
};

const businessRules = (v) => {
  if (!v) {
    return '사업자 번호를 입력하세요.';
  } else if (businessNumber.value.length < 12) {
    return '사업자 번호는 10자리 입니다.';
  }
  return true;
};

const isInfoSave = ref(false);

const handleLogin = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  loading.value = true;

  try {
    const res = await login(businessNumber.value, id.value, pw.value);
    if (res.header.code === 200) {
      accessToken.value = res.body.Authorization;
      user.value = res.body.userInfo;

      // 로그인 정보 기억
      if (isInfoSave.value) {
        localStorage.setItem(
          'info',
          JSON.stringify({
            businessNumber: businessNumber.value,
            id: id.value
          })
        );
      } else {
        localStorage.removeItem('info');
      }

      router.replace({ name: 'CommonCode' });
    } else {
      throw res;
    }
  } catch (error) {
    console.error(error);
    newToast(error.header.message, 'error');
  } finally {
    loading.value = false;
  }
};

const setLoginInfo = () => {
  const info = JSON.parse(localStorage.getItem('info'));

  if (!info) return;
  else {
    isInfoSave.value = true;
    businessNumber.value = info.businessNumber;
    id.value = info.id;
  }

  return;
};

onMounted(() => {
  setLoginInfo();
});
</script>
