import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToast = defineStore('toast', () => {
  const visible = ref(false);
  const message = ref(false);
  const type = ref(null);

  const newToast = (newMessage, newType) => {
    visible.value = true;
    type.value = newType;
    message.value = newMessage;
  };

  return {
    visible,
    message,
    type,
    newToast
  };
});
