<template>
  <VNavigationDrawer v-model="sideBar" temporary>
    <VList class="py-2">
      <VListItem
        v-for="(item, i) in mainMenu.subMenu"
        :key="i"
        :value="item"
        :active="item.menuCd === currentPage.menuCd"
        color="primary"
        class="px-4 py-3"
        @click="moveRoute(item)"
      >
        <VListItemTitle>
          <span class="text-subtitle-2">
            {{ item.menuNm }}
          </span>
        </VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script setup>
import router from '@/router';
import { useLayout } from '@/stores/useLayout';
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';

const layoutStore = useLayout();
const { sideBar } = storeToRefs(layoutStore);

const menuStore = useMenu();
const { mainMenu, currentPage } = storeToRefs(menuStore);

const moveRoute = (menu) => {
  currentPage.value = menu;

  sideBar.value = false;
  router.push({ path: menu.path });
};
</script>
