<template>
  <AppModal
    max-width="1000"
    min-height="600"
    max-height="600"
    title="프로젝트 목록"
    :visible="visible"
    @update:model-value="$emit('close')"
    @close="$emit('close')"
  >
    <VDataTable
      class="h-100 overflow-auto"
      :headers="headers"
      :items="projectList"
      :loading="loading"
    >
      <template #item.projectName="{ item, value }">
        <a class="text-secondary" @click="selectProject(item)">{{ value }}</a>
      </template>

      <template #loading>
        <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
      </template>
    </VDataTable>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useMenu } from '@/stores/useMenu';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import AppModal from '@/components/app/AppModal.vue';

const { projectList, project } = storeToRefs(useUser());
const { menus, projectMenu, mainMenu, currentPage } = storeToRefs(useMenu());

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const loading = ref(false);

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
  projectMenu.value = { ...menuList, smwpYn: selected.smwpYn };

  if (!selected.homeUrl) {
    router.push({ path: '/developing' });
    return;
  }

  mainMenu.value = menuList.mainMenu.find((menu) =>
    menu?.subMenu.some((sub) => sub.route === selected.homeUrl)
  );

  currentPage.value = mainMenu.value?.subMenu.find(
    (menu) => menu.route === selected.homeUrl
  );

  close();

  if (selected.smwpYn === 'Y') {
    router.push({
      path: `/view`,
      query: {
        scrId: selected.homeUrl
      }
    });
  } else {
    router.push({ path: selected.homeUrl });
  }
};

const close = () => {
  emit('close');
};
</script>
