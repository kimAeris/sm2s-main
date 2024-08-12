<template>
  <VNavigationDrawer v-model="sider" temporary>
    <!-- <VList :items="childMenus" item-title="menuNm" item-value="menuCd"></VList> -->

    <v-list class="py-2">
      <v-list-item
        v-for="(item, i) in childMenus"
        :key="i"
        :value="item"
        color="primary"
        class="px-4 py-3"
      >
        <v-list-item-title>
          <span class="text-subtitle-2">
            {{ item.menuNm }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </VNavigationDrawer>
</template>

<script setup>
import { useLayout } from '@/stores/useLayout';
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const layoutStore = useLayout();
const { sider } = storeToRefs(layoutStore);

const menuStore = useMenu();
const { menus, mainMenu } = storeToRefs(menuStore);

const childMenus = computed(
  () =>
    menus.value.find((menu) => menu.menuCd === mainMenu.value.menuCd)?.childList
);
</script>
