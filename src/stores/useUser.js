import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUser = defineStore('user', () => {
  const accessToken = ref(null);
  const user = ref([]);

  const project = ref({
    code: 1,
    name: 'ADMIN'
  });

  return {
    accessToken,
    user,
    project
  };
});
