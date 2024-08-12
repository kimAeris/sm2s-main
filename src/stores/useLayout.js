import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayout = defineStore('layout', () => {
  const header = ref(false);
  const sideBar = ref(false);

  const toggleSideBar = () => {
    sideBar.value = !sideBar.value;
  };

  return {
    header,
    sideBar,
    toggleSideBar
  };
});
