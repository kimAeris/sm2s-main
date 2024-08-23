<template>
  <VDialog
    :model-value="visible"
    @update:model-value="emit('close')"
    class="h-100"
    max-width="1000"
    min-height="600"
    max-height="600"
  >
    <VCard class="flex-grow-1 h-100" rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <span class="text-h6 ml-2">프로젝트 목록</span>
        </div>

        <VBtn icon="mdi-close" variant="text" @click="close"></VBtn>
      </VCardTitle>

      <VDivider></VDivider>

      <VCardText class="d-grid overflow-hidden">
        <VDataTable
          class="h-100 overflow-auto"
          v-model="selectedItems"
          :headers="headers"
          :items="projectList"
          :loading="loading"
        >
          <template #item.projectName="{ item, value }">
            <a class="text-secondary" @click="selectProject(item)">{{
              value
            }}</a>
          </template>
        </VDataTable>
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

const headers = [
  { title: '프로젝트명', key: 'projectName' },
  { title: '프로젝트 설명', key: 'projectDesc' },
  { title: '시작 화면', key: 'menuName' },
  {
    title: 'SMWP 사용 여부',
    key: 'smwpYn'
  },
  { title: '정렬번호', key: 'sortNo' }
];

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
