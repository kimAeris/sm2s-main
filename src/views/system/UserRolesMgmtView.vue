<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchData"
    @refresh="refresh"
  />

  <div class="content-body-row">
    <ContentBody title="유저" max-width="600"> </ContentBody>
    <ContentBody
      :headers="headers"
      v-model:items="items"
      v-model:addItems="addItems"
      can-add
      can-delete
      can-save
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
        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useToast } from '@/stores/useToast';
import { getUserRoles } from '@/api/system/userRoles';

const { newToast } = useToast();
const loading = ref(false);

const searchFilters = ref([
  {
    label: '사용자코드',
    key: 'userCode',
    type: 'text',
    value: '',
    cols: 3
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

const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getUserRoles(searchParams.value);
    items.value = res;
  } catch (error) {
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
