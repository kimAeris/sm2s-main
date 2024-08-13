import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore('menu', () => {
  // 메뉴 리스트
  const menus = ref([
    {
      menuCd: 1,
      menuNm: '시스템',
      childList: [
        {
          menuCd: 1,
          menuNm: '사업자관리',
          path: '/system/commonCode'
        },
        {
          menuCd: 2,
          menuNm: '사용자관리'
        },
        {
          menuCd: 3,
          menuNm: '메뉴관리'
        },
        {
          menuCd: 4,
          menuNm: '권한관리'
        }
      ]
    }
  ]);

  // 선택한 메뉴
  const mainMenu = ref({
    menuCd: 1,
    menuNm: '시스템',
    childList: [
      {
        menuCd: 1,
        menuNm: '사업자관리',
        path: '/system/commonCode'
      },
      {
        menuCd: 2,
        menuNm: '사용자관리'
      },
      {
        menuCd: 3,
        menuNm: '메뉴관리'
      },
      {
        menuCd: 4,
        menuNm: '권한관리'
      }
    ]
  });

  const currentPage = ref({
    menuCd: 1,
    menuNm: '사업자관리',
    path: '/system/commonCode'
  });

  return {
    menus,
    mainMenu,
    currentPage
  };
});
