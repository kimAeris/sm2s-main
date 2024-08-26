<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="setMenuList"
    @refresh="refresh"
  />

  <div class="d-flex overflow-hidden h-100 ga-4" style="padding-bottom: 1px">
    <ContentBody title="메뉴" min-width="300">
      <VList color="primary">
        <VSkeletonLoader :loading="loading" type="list-item-two-line">
          <VListGroup
            v-for="menus in menuList"
            :key="menus.projectCode"
            :value="menus.projectCode"
            :v-slot:activator="true"
          >
            <template #activator="activator">
              <VListItem
                rounded="lg"
                :value="menus.projectCode"
                :active="activeTab === menus.projectCode"
                @click="handleProject(menus.projectCode)"
              >
                {{ menus.projectName }}

                <template #append>
                  <VBtn
                    v-if="activator.isOpen"
                    v-bind="activator.props"
                    icon="mdi-chevron-up"
                    variant="text"
                    size="small"
                  >
                  </VBtn>
                  <VBtn
                    v-else
                    v-bind="activator.props"
                    icon="mdi-chevron-down"
                    variant="text"
                    size="small"
                  />
                </template>
              </VListItem>
            </template>

            <VListItem
              v-for="menu in menus.mainMenu"
              :active="activeTab === menu.menuCode"
              :key="menu.menuCode"
              :title="menu.menuName"
              :value="menu.menuCode"
              @click="handleMain(menu)"
            >
            </VListItem>
          </VListGroup>
        </VSkeletonLoader>
      </VList>
    </ContentBody>

    <ContentBody
      :headers="headers"
      v-model:items="items"
      v-model:addItems="addItems"
      v-model:selected-items="selectedItems"
      v-model:default-item-value="defaultItemValue"
      can-add
      can-delete
      can-save
      @save-handler="saveHandler"
      @delete-handler="deleteHandler"
    >
      <VDataTable
        class="h-100 overflow-auto"
        v-model="selectedItems"
        :headers="headers"
        :items="items"
        :loading="loading"
        show-select
      >
        <template #item.menuName="{ item, value }">
          <VTextField
            v-if="selectedItems.includes(item)"
            v-model="item.menuName"
            variant="outlined"
            density="compact"
            hide-details
          />
          <span v-else>
            {{ value }}
          </span>
        </template>

        <template #item.menuDesc="{ item, value }">
          <VTextField
            v-if="selectedItems.includes(item)"
            v-model="item.menuDesc"
            variant="outlined"
            density="compact"
            hide-details
          />
          <span v-else>
            {{ value }}
          </span>
        </template>

        <template #item.route="{ item, value }">
          <VTextField
            v-if="selectedItems.includes(item)"
            v-model="item.route"
            variant="outlined"
            density="compact"
            hide-details
          />
          <span v-else>
            {{ value }}
          </span>
        </template>

        <template #item.useYn="{ item, value }">
          <VSwitch
            v-if="selectedItems.includes(item)"
            v-model="item.useYn"
            false-value="N"
            true-value="Y"
            color="secondary"
            hide-details
          >
          </VSwitch>

          <span v-else>
            <VBadge :color="value === 'Y' ? 'success' : ''" inline dot />

            {{ value === 'Y' ? '사용' : '미사용' }}
          </span>
        </template>

        <template #item.sortNo="{ item, value }">
          <VTextField
            v-if="selectedItems.includes(item)"
            v-model="item.sortNo"
            variant="outlined"
            density="compact"
            type="number"
            hide-details
          />
          <span v-else>
            {{ value }}
          </span>
        </template>
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUser } from '@/stores/useUser';
import { getMenus, saveMenus, deleteMenus } from '@/api/system/menus';
import { useToast } from '@/stores/useToast';

const { projectList } = storeToRefs(useUser());

const activeProjectCode = ref(null);

const activeTab = ref(null);
const allMenuList = ref([]);
const menuList = ref([]);

const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);
const defaultItemValue = computed(() => {
  const isProject = activeTab.value?.includes('SCR') ? false : true;
  return [
    { key: 'projectCode', value: activeProjectCode.value },
    { key: 'parentMenuCode', value: activeTab.value },
    { key: 'level', value: isProject ? '1' : '2' },
    { key: 'useYn', value: 'Y' }
  ];
});

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

const searchParams = computed(() => {
  const params = {};
  searchFilters.value.forEach((filter) => {
    if (filter?.value) {
      params[filter.key] = filter.value;
    }
  });
  return params;
});

const originFilters = JSON.parse(JSON.stringify(searchFilters.value));

const refresh = () => {
  // 깊은 복사로 강제로 반응성 트리거
  searchFilters.value = JSON.parse(JSON.stringify(originFilters));
  setMenuList();
};

const headers = [
  { title: '메뉴 코드', key: 'menuCode' },
  { title: '메뉴명', key: 'menuName' },
  { title: '메뉴 설명', key: 'menuDesc' },
  { title: '라우트', key: 'route' },
  { title: '사용여부', key: 'useYn' },
  { title: '정렬번호', key: 'sortNo' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

const { newToast } = useToast();

const setMenuList = async () => {
  loading.value = true;
  try {
    const res = await getMenus(searchParams.value);
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
  } catch (error) {
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const saveHandler = async () => {
  loading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      menuCode: item.menuCode,
      projectCode: item.projectCode,
      menuName: item.menuName,
      menuDesc: item.menuDesc,
      parentMenuCode: item.parentMenuCode,
      level: item.level,
      sortNo: item.sortNo,
      route: item.route,
      useYn: item.useYn
    }));
    const res = await saveMenus({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      setMenuList();

      selectedItems.value = [];
    }
  } catch (error) {
    newToast('저장을 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const deleteHandler = async () => {
  loading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      menuCode: item.menuCode,
      projectCode: item.projectCode
    }));
    const res = await deleteMenus({ list: params });

    if (res.header.code === 200) {
      newToast('삭제되었습니다', 'success');

      items.value = items.value.filter(
        (item) => !selectedItems.value.includes(item)
      );
      selectedItems.value = [];
    }
  } catch (error) {
    newToast('삭제를 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

// 프로젝트 선택
const handleProject = (selected) => {
  activeTab.value = selected;
  activeProjectCode.value = selected;

  items.value = menuList.value.find(
    (menu) => menu.projectCode === selected
  ).mainMenu;

  selectedItems.value = [];
};

// 메뉴 선택
const handleMain = (selected) => {
  activeTab.value = selected.menuCode;

  const mainMenu = menuList.value.find(
    (item) => item.projectCode === selected.projectCode
  ).mainMenu;

  items.value = mainMenu.find(
    (item) => item.menuCode === selected.menuCode
  ).subMenu;

  selectedItems.value = [];
};

onMounted(() => {
  setMenuList();
});
</script>
