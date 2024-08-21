import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUser = defineStore(
  'user',
  () => {
    const accessToken = ref(null);
    const user = ref([]);
    const projectList = ref([]);

    const project = ref({});

    const resetUser = () => {
      accessToken.value = null;
      user.value = [];
      projectList.value = [];
      project.value = {};
    };

    return {
      accessToken,
      user,
      projectList,
      project,
      resetUser
    };
  },
  {
    persist: true
  }
);
