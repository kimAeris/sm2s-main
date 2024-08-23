<template>
  <ContentHeader v-model:filters="searchFilters" />

  <div class="d-flex overflow-hidden h-100 ga-4" style="padding-bottom: 1px">
    <ContentBody title="메뉴" min-width="300">
      <VList v-model="list">
        <VListItem title="전체 목록" value="all" @click="handleAll">
        </VListItem>
        <VListGroup
          v-for="menus in menuList"
          :key="menus.projectCode"
          :value="menus.projectName"
        >
          <template v-slot:activator="{ props }">
            <VListItem
              v-bind="props"
              :title="menus.projectName"
              @click="handleProject(menus.projectCode)"
            ></VListItem>
          </template>

          <VListItem
            v-for="menu in menus.mainMenu"
            :key="menu.menuCode"
            :title="menu.menuName"
            :value="menu.menuCode"
            @click="handleMain(menu)"
          ></VListItem>
        </VListGroup>
      </VList>
    </ContentBody>

    <ContentBody>
      <VDataTable
        class="h-100 overflow-auto"
        v-model="selectedItems"
        :headers="headers"
        :items="items"
        :loading="loading"
        show-select
      >
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUser } from '@/stores/useUser';
import { getMenus } from '@/api/system/menus';

const { projectList } = storeToRefs(useUser());

const list = ref('all');
const allMenuList = ref([]);
const menuList = ref([]);

const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);

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

const setMenuList = async () => {
  try {
    const res = await getMenus();
    allMenuList.value = res;

    const result = res.reduce((acc, obj) => {
      let project = acc.find((p) => p.projectCode === obj.projectCode);

      if (!project) {
        project = {
          projectCode: obj.projectCode,
          projectName: obj.projectName,
          mainMenu: []
        };
        acc.push(project);
      }

      if (obj.level === '1') {
        project.mainMenu.push({
          ...obj,
          subMenu: []
        });
      } else if (obj.level === '2') {
        const mainMenu = project.mainMenu.find(
          (item) => item.menuCode === obj.parentMenuCode
        );

        if (mainMenu) {
          mainMenu.subMenu.push(obj);
        }
      }

      return acc;
    }, []);

    menuList.value = result;

    console.log('result', result);
  } catch (error) {
    console.error(error);
  }
};

const handleAll = () => {
  items.value = allMenuList.value;
};

const handleProject = (selected) => {
  items.value = menuList.value.find(
    (menu) => menu.projectCode === selected
  ).mainMenu;
};

const handleMain = (selected) => {
  const mainMenu = menuList.value.find(
    (item) => item.projectCode === selected.projectCode
  ).mainMenu;

  items.value = mainMenu.find(
    (item) => item.menuCode === selected.menuCode
  ).subMenu;
};

const headers = [
  { title: '메뉴 코드', key: 'menuCode' },
  { title: '메뉴명', key: 'menuName' },
  { title: '메뉴 설명', key: 'menuDesc' },
  { title: '사용여부', key: 'useYn' },
  { title: '정렬번호', key: 'sortNo' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

onMounted(() => {
  setMenuList();
});
</script>
