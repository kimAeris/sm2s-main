<template>
  <VDialog
    :model-value="visible"
    @update:model-value="emit('close')"
    max-width="600"
  >
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- <VIcon icon="mdi-folder-marker" size="small"></VIcon> -->
          <span class="text-h6 ml-2">프로젝트 목록</span>
        </div>

        <VBtn icon="mdi-close" variant="text" @click="close"></VBtn>
      </VCardTitle>

      <VDivider></VDivider>

      <VCardText>
        <VContainer>
          <VRow align="center">
            <VCol
              cols="6"
              class="pa-5"
              v-for="item in projectList"
              :key="item.projectCode"
            >
              <VBtn
                class="w-100"
                elevation="4"
                size="x-large"
                :variant="
                  project.projectName === item.projectName ? 'tonal' : undefined
                "
                :color="
                  project.projectName === item.projectName
                    ? 'primary'
                    : undefined
                "
                @click="selectProject(item)"
              >
                {{ item.projectName }}
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import router from '@/router';
import { useMenu } from '@/stores/useMenu';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';

const { projectList, project } = storeToRefs(useUser());
const { menus, projectMenu, mainMenu, currentPage } = storeToRefs(useMenu());

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const selectProject = (selected) => {
  const menuList = menus.value.find(
    (menu) => String(menu.projectCode) === selected.projectCode
  );

  project.value = selected;
  projectMenu.value = menuList;
  mainMenu.value = menuList.mainMenu.find((menu) =>
    menu.subMenu.some((sub) => sub.path === '/system/projects')
  );

  currentPage.value = mainMenu.value.subMenu.find(
    (menu) => menu.path === menuList.homeUrl
  );

  close();
  router.push({ path: menuList.homeUrl });
};

const close = () => {
  emit('close');
};
</script>
