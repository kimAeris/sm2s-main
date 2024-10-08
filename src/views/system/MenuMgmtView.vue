<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="setMenuList"
    @refresh="refresh"
  />

  <div class="d-flex overflow-hidden h-100 ga-4" style="padding-bottom: 1px">
    <ContentBody title="메뉴" min-width="300" max-width="300">
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
                :id="`list-${menus.projectCode}`"
                rounded="lg"
                :value="menus.projectCode"
                :active="activeMenuCode === menus.projectCode"
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
                    @click="handleProject(menus.projectCode)"
                  >
                  </VBtn>
                  <VBtn
                    v-else
                    v-bind="activator.props"
                    icon="mdi-chevron-down"
                    variant="text"
                    size="small"
                    @click="handleProject(menus.projectCode)"
                  />
                </template>
              </VListItem>
            </template>

            <VListItem
              v-for="menu in menus.mainMenu"
              :id="`list-${menus.menuCode}`"
              :active="activeMenuCode === menu.menuCode"
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
      @save-handler="handleSave"
      @delete-handler="handleDelete"
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

          <div class="badge-text" v-else>
            <VBadge :color="value === 'Y' ? 'success' : ''" inline dot />

            {{ value === 'Y' ? '사용' : '미사용' }}
          </div>
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

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { retrieveMenus, updateMenus, deleteMenus } from '@/api/system/menus';
import { useToast } from '@/stores/useToast';

const { newToast } = useToast();

// 검색 조건
const searchFilters = ref([
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

// 리스트
const activeProjectCode = ref(null);
const activeMenuCode = ref(null);
const menuList = ref([]);

// 프로젝트 선택
const handleProject = (selected) => {
  activeMenuCode.value = selected;
  activeProjectCode.value = selected;

  items.value = menuList.value.find(
    (menu) => menu.projectCode === selected
  ).mainMenu;

  selectedItems.value = [];
};

// 메뉴 선택
const handleMain = (selected) => {
  activeMenuCode.value = selected.menuCode;

  const mainMenu = menuList.value.find(
    (item) => item.projectCode === selected.projectCode
  ).mainMenu;

  items.value = mainMenu.find(
    (item) => item.menuCode === selected.menuCode
  ).subMenu;

  selectedItems.value = [];
};

// 테이블
const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);
const defaultItemValue = computed(() => {
  const isProject = activeMenuCode.value?.includes('SCR') ? false : true;
  return [
    { key: 'projectCode', value: activeProjectCode.value },
    { key: 'parentMenuCode', value: activeMenuCode.value },
    { key: 'level', value: isProject ? '1' : '2' },
    { key: 'useYn', value: 'Y' }
  ];
});
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

const setMenuList = async () => {
  loading.value = true;
  try {
    const res = await retrieveMenus(searchParams.value);

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
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
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
    const res = await updateMenus({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      // 메뉴코드 새로고침 위한 재조회
      setMenuList();
      // 메뉴 클릭하여 세팅
      handleMain({
        projectCode: activeProjectCode.value,
        menuCode: activeMenuCode.value
      });

      const tabEl = document.querySelector(`list-${activeMenuCode.value}`);
      if (tabEl) {
        tabEl.click(); // DOM 요소에 대해 직접 클릭 이벤트 트리거
      }

      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
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
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  setMenuList();
});
</script>
