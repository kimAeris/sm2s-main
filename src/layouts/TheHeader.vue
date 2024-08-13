<template>
  <VAppBar v-if="header" :elevation="2" color="primary" height="46">
    <VContainer class="fill-height d-flex flex-nowrap align-center" fluid>
      <VAppBarNavIcon @click="toggleSideBar"></VAppBarNavIcon>

      <h5 class="ml-2">SM2S</h5>

      <VSlideGroup show-arrows class="w-100 px-10">
        <VSlideGroupItem
          v-for="menu in menus"
          :key="menu"
          v-slot="{ isSelected }"
        >
          <VBtn
            class="text-body-1"
            :color="isSelected ? 'primary' : undefined"
            rounded
            @click="handleMenu(menu)"
          >
            {{ menu.menuNm }}
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>

      <div class="d-flex align-center ml-auto ga-3">
        <span style="white-space: nowrap" class="text-body-2">사용자</span>

        <VBtn icon>
          <VIcon icon="mdi-logout" size="small" @click="handleLogout"></VIcon>
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>
</template>

<script setup>
import router from '@/router';
import { useLayout } from '@/stores/useLayout';
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const layoutStore = useLayout();
const menuStore = useMenu();

const { menus } = menuStore;
const { header, sideBar } = storeToRefs(layoutStore);
const { mainMenu } = storeToRefs(menuStore);
const { toggleSideBar } = layoutStore;

const handleMenu = (menu) => {
  if (!sideBar.value) {
    sideBar.value = true;
  }

  mainMenu.value = menu;
};

const route = useRoute();
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/login') header.value = false;
    else header.value = true;
  }
);

const handleLogout = () => {
  router.push({ name: 'Login' });
};
</script>

<style scoped></style>
