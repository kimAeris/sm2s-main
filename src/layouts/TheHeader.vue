<template>
  <VAppBar v-if="header" :elevation="2" color="primary" height="46">
    <VContainer class="fill-height d-flex flex-nowrap align-center" fluid>
      <VAppBarNavIcon @click="toggleSideBar"></VAppBarNavIcon>

      <VBtn class="ml-2" height="46" rounded="xl">
        <span class="text-h6" :key="project.name">{{ project.name }}</span>

        <VMenu activator="parent">
          <VList>
            <VListItem
              v-for="(item, i) in projectList"
              :key="i"
              :value="item"
              :active="item.code === project.code"
              color="primary"
              @click="selectProject(item)"
            >
              <VListItemTitle>{{ item.name }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>

      <VSlideGroup show-arrows class="w-100 px-10">
        <VSlideGroupItem v-for="menu in menus" :key="menu">
          <VBtn
            class="text-body-1"
            :color="mainMenu.menuCd === menu.menuCd ? 'secondary' : undefined"
            rounded
            @click="handleMenu(menu)"
          >
            {{ menu.menuNm }}
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>

      <div class="d-flex align-center ml-auto ga-3">
        <span style="white-space: nowrap" class="text-body-2">사용자</span>

        <VBtn icon @click="handleLogout">
          <VIcon icon="mdi-logout" size="small"></VIcon>
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>
</template>

<script setup>
import router from '@/router';
import { useLayout } from '@/stores/useLayout';
import { useMenu } from '@/stores/useMenu';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const layoutStore = useLayout();
const menuStore = useMenu();

const { header, sideBar } = storeToRefs(layoutStore);
const { menus, mainMenu } = storeToRefs(menuStore);
const { toggleSideBar } = layoutStore;

const handleMenu = (menu) => {
  if (!sideBar.value) {
    sideBar.value = true;
  }

  mainMenu.value = menu;
};

const userStore = useUser();
const { project } = storeToRefs(userStore);

// TODO: api 요청
const projectList = [
  {
    code: 1,
    name: 'ADMIN'
  },
  {
    code: 2,
    name: 'SMSP'
  },
  {
    code: 3,
    name: 'SM2S'
  }
];

const route = useRoute();
const commonPath = ['/', '/login'];
watch(
  () => route.path,
  (newPath) => {
    if (commonPath.includes(newPath)) header.value = false;
    else header.value = true;
  }
);

const selectProject = (selectItem) => {
  project.value = selectItem;

  // TODO: api 요청
  if (selectItem.code === 1) {
    menus.value = systemMenu;
  } else if (selectItem.code === 2) {
    menus.value = smspMenu;
  } else if (selectItem.code === 3) {
    menus.value = sm2sMenu;
  }

  mainMenu.value = menus.value[0];
  router.push({ path: menus.value[0].childList[0].path });
};

// TODO: 임시 데이터
const systemMenu = [
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
];

const sm2sMenu = [
  {
    menuCd: 2,
    menuNm: '기초 관리',
    childList: [
      {
        menuCd: 1,
        menuNm: '거래처 등록',
        path: '/info/client'
      },
      {
        menuCd: 2,
        menuNm: '제품 등록',
        path: '/info/product'
      }
    ]
  },
  {
    menuCd: 3,
    menuNm: '생산 관리'
  }
];

const smspMenu = [
  {
    menuCd: 3,
    menuNm: 'SMSP',
    childList: [
      {
        menuCd: 1,
        menuNm: '제품 등록',
        path: '/info/product'
      },
      {
        menuCd: 2,
        menuNm: '거래처 등록',
        path: '/info/client'
      }
    ]
  }
];

const handleLogout = () => {
  router.push({ name: 'Login' });
};
</script>
