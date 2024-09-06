<template>
  <VAppBar v-if="header" :elevation="2" color="primary" height="52">
    <VContainer class="d-flex flex-nowrap align-center" fluid>
      <VAppBarNavIcon @click="toggleSideBar"></VAppBarNavIcon>

      <VImg :width="80" height="52" src="/src/assets/logo.png" class="pa-3" />

      <VBtn class="nowrap" rounded @click="openProjectModal">
        <a :key="project.name">
          {{ project.projectName }}
        </a>
      </VBtn>

      <VSlideGroup show-arrows class="w-100 px-10">
        <VSlideGroupItem v-for="menu in projectMenu.mainMenu" :key="menu">
          <VBtn
            class="text-body-1"
            rounded
            :color="
              menu?.menuCode === mainMenu?.menuCode
                ? 'secondary-variant'
                : undefined
            "
            @click="handleMenu(menu)"
          >
            {{ menu.menuName }}
          </VBtn>
        </VSlideGroupItem>
      </VSlideGroup>

      <div class="d-flex align-center ml-auto">
        <span class="mr-4 text-body-2 nowrap">사용자</span>

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
import { useFeedback } from '@/stores/useFeedback';
import { logout } from '@/api/common';

const layoutStore = useLayout();
const menuStore = useMenu();

const { header, sideBar } = storeToRefs(layoutStore);
const { projectMenu, mainMenu } = storeToRefs(menuStore);
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

const { openFeedback } = useFeedback();
const handleLogout = async () => {
  const feedback = await openFeedback(
    'info',
    'LOGOUT',
    '로그아웃 하시겠습니까?',
    '취소',
    '확인'
  );

  if (!feedback) return;

  try {
    await logout();

    userStore.resetUser();
    menuStore.resetMenu();
    router.push({ name: 'Login' });
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
  }
};
</script>
