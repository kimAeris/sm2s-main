<template>
  <VAppBar v-if="header" :elevation="2" color="primary" height="52">
    <VContainer class="d-flex flex-nowrap align-center" fluid>
      <VAppBarNavIcon @click="toggleSideBar"></VAppBarNavIcon>

      <span
        class="ml-2 text-h6 cursor-pointer"
        :key="project.name"
        @click="moveHome"
      >
        {{ project.name }}
      </span>
      <!-- <VBtn class="ml-2" height="46" rounded="xl">

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
      </VBtn> -->

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

      <div class="d-flex align-center ml-auto">
        <span class="mr-4 text-body-2" style="white-space: nowrap">사용자</span>

        <VBtn icon @click="openProjectModal">
          <VIcon icon="mdi-folder-marker-outline" size="small"></VIcon>
        </VBtn>

        <VBtn icon @click="handleLogout">
          <VIcon icon="mdi-logout" size="small"></VIcon>
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>

  <ProjectSelector :visible="projectModal" @close="closeProjectModal" />
</template>

<script setup>
import router from '@/router';
import { useLayout } from '@/stores/useLayout';
import { useMenu } from '@/stores/useMenu';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProjectSelector from '@/components/modals/ProjectSelectorModal.vue';

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

const route = useRoute();
const commonPath = ['/', '/login'];
watch(
  () => route.path,
  (newPath) => {
    if (commonPath.includes(newPath)) header.value = false;
    else header.value = true;
  }
);

const projectModal = ref(false);

const openProjectModal = () => {
  projectModal.value = true;
};

const closeProjectModal = () => {
  projectModal.value = false;
};

const handleLogout = () => {
  userStore.resetUser();
  menuStore.resetMenu();
  router.push({ name: 'Login' });
};
</script>
