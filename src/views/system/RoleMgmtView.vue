<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchData"
    @refresh="refresh"
  />

  <ContentBody
    :headers="headers"
    v-model:items="items"
    v-model:addItems="addItems"
    v-model:selected-items="selectedItems"
    can-add
    can-delete
    can-save
    @delete-handler="handleDelete"
    @save-handler="handleSave"
  >
    <VDataTable
      class="h-100 overflow-auto"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      :loading="loading"
      return-object
      show-select
    >
      <template #item.projectCode="{ item, value }">
        <VSelect
          v-if="selectedItems.includes(item)"
          v-model="item.projectCode"
          :items="projectList"
          item-title="title"
          item-value="value"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ projectList.find((project) => project.value === value)?.title }}
        </span>
      </template>

      <template #item.roleName="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.roleName"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.roleDesc="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.roleDesc"
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

      <template #loading>
        <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
      </template>
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import { retrieveProjects } from '@/api/system/projects';
import { deleteRoles, retrieveRoles, updateRoles } from '@/api/system/roles';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';

const { newToast } = useToast();

// 검색 조건
const searchFilters = ref([
  {
    label: '권한명',
    key: 'roleName',
    type: 'text',
    value: '',
    cols: 3
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
  searchFilters.value = JSON.parse(JSON.stringify(originFilters));
  fetchData();
};

// 테이블
const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);
const headers = ref([
  {
    title: '프로젝트명',
    key: 'projectCode'
  },
  { title: '권한명', key: 'roleName' },
  { title: '권한 설명', key: 'roleDesc' },
  { title: '사용여부', key: 'useYn' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
]);

// 프로젝트 셀렉트박스 목록
const projectList = ref([]);
const fetchProjectList = async () => {
  try {
    const res = await retrieveProjects();
    projectList.value = res.map((item) => ({
      title: item.projectName,
      value: item.projectCode
    }));
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  }
};

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await retrieveRoles(searchParams.value);
    items.value = res;
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
      roleCode: item.roleCode,
      projectCode: item.projectCode,
      roleName: item.roleName,
      roleDesc: item.roleDesc,
      useYn: item.useYn
    }));
    const res = await updateRoles({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      fetchData();

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
      roleCode: item.roleCode
    }));
    const res = await deleteRoles({ list: params });

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
  fetchProjectList();
  fetchData();
});
</script>
