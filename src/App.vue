<template>
  <VApp>
    <TheHeader />
    <TheSideBar />
    <TheView />
    <AppToast />
    <AppFeedback />
  </VApp>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheSideBar from '@/layouts/TheSideBar.vue';
import TheView from '@/layouts/TheView.vue';
import AppToast from './components/app/AppToast.vue';
import AppFeedback from './components/app/AppFeedback.vue';
import { onUnmounted } from 'vue';
import { logout } from '@/api/common';
import { useUser } from './stores/useUser';
import { useMenu } from './stores/useMenu';

const userStore = useUser();
const menuStore = useMenu();

// TODO: 로직 수정 필요 (작동X)
const handleLogout = async () => {
  try {
    await logout();

    userStore.resetUser();
    menuStore.resetMenu();
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
  }
};

onUnmounted(() => {
  handleLogout();
});
</script>
