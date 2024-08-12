import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayout = defineStore('layout', () => {
  const sider = ref(false);

  const toggleSider = () => {
    sider.value = !sider.value;
  };

  return {
    sider,
    toggleSider
  };
});
