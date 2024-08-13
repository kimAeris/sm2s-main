<template>
  <VAppBar v-if="header" :elevation="2" full-height color="primary">
    <VContainer class="d-flex flex-nowrap align-center" fluid>
      <VAppBarNavIcon @click="toggleSideBar"></VAppBarNavIcon>

      <h5 class="ml-2">SM2S</h5>

      <VSlideGroup show-arrows class="w-100 px-10">
        <VSlideGroupItem
          v-for="menu in menus"
          :key="menu"
          v-slot="{ isSelected }"
        >
          <VBtn
            :color="isSelected ? 'primary' : undefined"
            rounded
            @click="handleMenu(menu)"
          >
            {{ menu.menuNm }}
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>

      <div class="d-flex align-center ml-auto ga-3">
        <div style="white-space: nowrap">사용자</div>

        <VBtn icon>
          <VIcon icon="mdi-logout"></VIcon>
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>
</template>

<script setup>
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
</script>

<style scoped></style>
