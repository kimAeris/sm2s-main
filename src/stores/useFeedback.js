import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFeedback = defineStore('feedback', () => {
  const resolveParams = ref(null);

  const feedback = ref(false);
  const message = ref(null);
  const title = ref(null);
  const type = ref(null);
  const cancelText = ref(null);
  const confirmText = ref(null);

  const openFeedback = (
    openType,
    openTitle,
    openMessage,
    openCancelText,
    openConfirmText
  ) => {
    feedback.value = true;
    type.value = openType;
    title.value = openTitle;
    message.value = openMessage;
    cancelText.value = openCancelText;
    confirmText.value = openConfirmText;

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
    type,
    title,
    message,
    cancelText,
    confirmText,
    openFeedback,
    confirm,
    cancel
  };
});
