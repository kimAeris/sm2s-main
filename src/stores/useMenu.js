import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore(
  'menu',
  () => {
    // 메뉴 리스트
    const menus = ref([]);

    // 프로젝트 메뉴 리스트
    const projectMenu = ref([]);

    // 선택한 메뉴
    const mainMenu = ref({});

    const currentPage = ref({});

    const resetMenu = () => {
      menus.value = [];
      projectMenu.value = [];
      mainMenu.value = {};
      currentPage.value = {};
    };

    return {
      menus,
      projectMenu,
      mainMenu,
      currentPage,
      resetMenu
    };
  },
  {
    persist: true
  }
);
