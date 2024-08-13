import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUser = defineStore('user', () => {
  const project = ref({
    code: 1,
    name: 'ADMIN'
  });

  return {
    project
  };
});
