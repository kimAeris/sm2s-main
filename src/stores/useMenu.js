import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore('menu', () => {
  // 메뉴 리스트
  const menus = ref([
    {
      menuCd: 1,
      menuNm: '모니터링',
      childList: [
        {
          menuCd: 1,
          menuNm: '모니터링'
        }
      ]
    },
    {
      menuCd: 2,
      menuNm: '주문 관리',
      childList: [
        {
          menuCd: 1,
          menuNm: '수주서'
        }
      ]
    },
    {
      menuCd: 3,
      menuNm: '생산 관리',
      childList: [
        {
          menuCd: 1,
          menuNm: '생산 실적 현황'
        },
        {
          menuCd: 2,
          menuNm: '생산 불량 현황'
        }
      ]
    }
  ]);

  // 선택한 메뉴
  const mainMenu = ref({});

  return {
    menus,
    mainMenu
  };
});
