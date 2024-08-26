<template>
  <ContentHeader v-model:filters="searchFilters" />

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

    <ContentBody>
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
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUser } from '@/stores/useUser';
import { getMenus } from '@/api/system/menus';
import { useToast } from '@/stores/useToast';

const { projectList } = storeToRefs(useUser());

const activeTab = ref(null);
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

const { newToast } = useToast();

const setMenuList = async () => {
  loading.value = true;
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
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

// 프로젝트 선택
const handleProject = (selected) => {
  activeTab.value = selected;

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

onMounted(() => {
  setMenuList();
});
</script>
