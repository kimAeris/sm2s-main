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
    @delete-handler="deleteHandler"
    @save-handler="saveHandler"
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
          {{ projectList.find((project) => project.value === value).title }}
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

        <span v-else>
          <VBadge :color="value === 'Y' ? 'success' : ''" inline dot />

          {{ value === 'Y' ? '사용' : '미사용' }}
        </span>
      </template>
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import { getProjects } from '@/api/system/projects';
import { deleteRoles, getRoles, saveRoles } from '@/api/system/roles';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';

const loading = ref(false);

const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);

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

const headers = ref([
  {
    title: '프로젝트명',
    key: 'projectCode'
  },
  { title: '권한 코드', key: 'roleCode' },
  { title: '권한명', key: 'roleName' },
  { title: '권한 설명', key: 'roleDesc' },
  { title: '사용여부', key: 'useYn' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
]);

const { newToast } = useToast();

const projectList = ref([]);
const getProjectList = async () => {
  try {
    const res = await getProjects();
    projectList.value = res.map((item) => ({
      title: item.projectName,
      value: item.projectCode
    }));
  } catch (error) {
    newToast('조회에 실패했습니다.', 'error');
  }
};

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getRoles(searchParams.value);
    items.value = res;
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
      roleCode: item.roleCode,
      projectCode: item.projectCode,
      roleName: item.roleName,
      roleDesc: item.roleDesc,
      useYn: item.useYn
    }));
    const res = await saveRoles({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      fetchData();

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
    newToast('삭제를 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProjectList();
  fetchData();
});
</script>
