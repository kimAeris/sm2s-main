<template>
  <VDialog v-model="feedback" max-width="400">
    <VCard class="align-center pa-6 ga-4" rounded="xl" elevation="8">
      <VIcon
        icon="mdi-check-circle"
        size="x-large"
        style="font-size: 100px"
        :color="type"
      />
      <h4 class="font-weight-bold" :class="textClass">SUCCESS</h4>
      <h6 v-html="message" class="text-center"></h6>

      <div class="d-flex ga-4 mt-4">
        <VBtn :color="type" @click="confirm"> 확인 </VBtn>
        <!-- <VBtn @click="cancel"> 닫기 </VBtn> -->
      </div>
    </VCard>
  </VDialog>
</template>

<script setup>
import { useFeedback } from '@/stores/useFeedback';
import { storeToRefs } from 'pinia';

// const message = `비밀번호가 변경되었습니다. <br /> 다시 로그인해주세요.`;
const { feedback, type, message } = storeToRefs(useFeedback());
const { confirm, cancel } = useFeedback();
const textClass = `text-${type.value}`;
</script>
