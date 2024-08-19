import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFeedback = defineStore('feedback', () => {
  const resolveParams = ref(null);

  const feedback = ref(false);
  const message = ref(null);
  const type = ref(null);

  const openFeedback = (openType, openMessage) => {
    feedback.value = true;
    type.value = openType;
    message.value = openMessage;

    return new Promise((resolve) => {
      resolveParams.value = resolve;
    });
  };

  const confirm = () => {
    feedback.value = false;
    resolveParams.value(true);
  };

  const cancel = () => {
    feedback.value = false;
    resolveParams.value(false);
  };

  return {
    feedback,
    message,
    type,
    openFeedback,
    confirm,
    cancel
  };
});
