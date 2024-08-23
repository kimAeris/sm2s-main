<template>
  <ContentHeader v-model:filters="searchFilters" />

  <VRow>
    <VCol cols="3" class="pr-0">
      <ContentBody class="h-100" title="메뉴">
        <VList v-model:opened="open">
          <VListGroup
            v-for="menus in menuList"
            :key="menus.projectCd"
            :value="menus.projectCd"
          >
            <template v-slot:activator="{ props }">
              <VListItem v-bind="props" :title="menus.projectNm"></VListItem>
            </template>

            <VListItem
              v-for="({ mainMenuNm, mainMenuCd }, i) in menus.menu"
              :key="i"
              :title="mainMenuNm"
              :value="mainMenuCd"
            ></VListItem>
          </VListGroup>
        </VList>
      </ContentBody>
    </VCol>
    <VCol>
      <ContentBody class="h-100" />
    </VCol>
  </VRow>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUser } from '@/stores/useUser';
import { useMenu } from '@/stores/useMenu';

const { menus } = storeToRefs(useMenu());
const { projectList } = storeToRefs(useUser());

const menuList = ref([]);

const open = ref(['Users']);

const setProjectOptions = () => {
  const list = projectList.value.map((list) => ({
    title: list.projectName,
    value: list.projectCode
  }));
  return [{ title: '전체', value: '' }, ...list];
};

const searchFilters = ref([
  {
    label: '프로젝트명',
    key: 'projectCode',
    type: 'select',
    value: '',
    options: setProjectOptions()
  },
  {
    label: '메뉴명',
    key: 'menuName',
    type: 'text',
    value: ''
  },
  {
    label: '사용여부',
    key: 'useYn',
    type: 'selectUse',
    value: ''
  }
]);

const getMenuList = () => {
  const result = projectList.value.map((project) => ({
    projectCd: project.projectCode,
    projectNm: project.projectName
  }));

  result.forEach((project) => {
    const menuList = menus.value.find(
      (menu) => menu.projectCode === project.projectCd
    );

    project.menu = menuList?.mainMenu.map((menu) => ({
      mainMenuCd: menu.mainMenuCd,
      mainMenuNm: menu.mainMenuNm
    }));
  });

  menuList.value = result;
};

onMounted(() => {
  getMenuList();
});
</script>
