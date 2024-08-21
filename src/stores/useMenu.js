import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore(
  'menu',
  () => {
    // 메뉴 리스트
    const menus = ref([
      {
        projectCode: '1',
        menuCd: 1,
        menuNm: '시스템',
        homeUrl: '/system/projects',
        childList: [
          {
            menuCd: 1,
            menuNm: '프로젝트관리',
            path: '/system/projects'
          },
          {
            menuCd: 2,
            menuNm: '사용자관리',
            path: '/system/users'
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
      },
      {
        projectCode: '2',
        menuCd: 2,
        menuNm: '기초 관리',
        homeUrl: '/info/client',
        childList: [
          {
            menuCd: 5,
            menuNm: '거래처 등록',
            path: '/info/client'
          },
          {
            menuCd: 6,
            menuNm: '제품 등록',
            path: '/info/product'
          }
        ]
      },
      {
        projectCode: '3',
        menuCd: 3,
        menuNm: '기초 관리',
        homeUrl: '/info/client',
        childList: [
          {
            menuCd: 7,
            menuNm: '거래처 등록',
            path: '/info/client'
          },
          {
            menuCd: 8,
            menuNm: '제품 등록',
            path: '/info/product'
          }
        ]
      }
    ]);

    // 선택한 메뉴
    const mainMenu = ref({
      // menuCd: 1,
      // menuNm: '시스템',
      // childList: [
      //   {
      //     menuCd: 1,
      //     menuNm: '프로젝트관리',
      //     path: '/system/projects'
      //   },
      //   {
      //     menuCd: 2,
      //     menuNm: '사용자관리',
      //     path: '/system/users'
      //   },
      //   {
      //     menuCd: 3,
      //     menuNm: '메뉴관리'
      //   },
      //   {
      //     menuCd: 4,
      //     menuNm: '권한관리'
      //   }
      // ]
    });

    const currentPage = ref({
      // menuCd: 2,
      // menuNm: '사용자관리',
      // path: '/system/users'
    });

    const resetMenu = () => {
      mainMenu.value = {};
      currentPage.value = {};
    };

    return {
      menus,
      mainMenu,
      currentPage,
      resetMenu
    };
  },
  {
    persist: true
  }
);
