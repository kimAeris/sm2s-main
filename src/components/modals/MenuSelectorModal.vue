<template>
  <AppModal
    :visible="visible"
    max-width="1000"
    min-height="600"
    max-height="600"
    title="메뉴 목록"
    @update:model-value="emits('close')"
    @close="emits('close')"
  >
    <div class="d-flex ga-3">
      <VSheet min-width="200">
        <VList color="primary">
          <VListItem
            v-for="menu in menuList"
            :key="menu"
            :value="menu.menuCode"
            :title="menu.menuName"
            :active="activeMenuCode === menu.menuCode"
            @click="handleProject(menu.menuCode)"
          >
          </VListItem>
        </VList>
      </VSheet>

      <VDataTable
        class="h-100 overflow-auto"
        :headers="headers"
        :items="items"
        :loading="loading"
      >
        <template #item.menuName="{ item, value }">
          <a class="text-secondary" @click="selectMenu(item)">
            {{ value }}
          </a>
        </template>

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from '@/components/app/AppModal.vue';
import { onMounted, ref } from 'vue';
import { getMenus } from '@/api/system/menus';
import { useToast } from '@/stores/useToast';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  projectCode: {
    type: String,
    required: true
  }
});

const { newToast } = useToast();

const loading = ref(false);
const items = ref([]);

const headers = [
  { title: '메뉴명', key: 'menuName' },
  { title: '메뉴 설명', key: 'menuDesc' }
];

const menuList = ref([]);
const activeMenuCode = ref(null);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getMenus({
      projectCode: props.projectCode
    });

    let menus = [];
    res.forEach((obj) => {
      if (obj.level === '1') {
        menus.push({
          ...obj,
          subMenu: []
        });
      } else if (obj.level === '2') {
        const mainMenu = menus.find(
          (item) => item.menuCode === obj.parentMenuCode
        );

        if (mainMenu) {
          mainMenu.subMenu.push(obj);
        }
      }
    });
    menuList.value = menus;

    handleProject(menus[0].menuCode);
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const handleProject = (menuCode) => {
  activeMenuCode.value = menuCode;

  items.value = menuList.value.find(
    (menu) => menu.menuCode === menuCode
  ).subMenu;
};

const emits = defineEmits(['selectMenu', 'close']);

const selectMenu = (item) => {
  emits('selectMenu', {
    projectCode: props.projectCode,
    menuCode: item.menuCode,
    menuName: item.menuName
  });
  emits('close');
};

onMounted(() => {
  fetchData();
});
</script>
