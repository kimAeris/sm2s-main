<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchData"
    @refresh="refresh"
  />
  <ContentBody
    :headers="headers"
    v-model:items="items"
    v-model:selected-items="selectedItems"
  >
    <VDataTable
      class="h-100 overflow-auto"
      :headers="headers"
      :items="items"
      :loading="loading"
      return-object
    >
      <template #loading>
        <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
      </template>
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import { retrieveLoginLog } from '@/api/system/log';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';

const { newToast } = useToast();

// 검색 조건
const searchFilters = ref([
  {
    label: '시작일자',
    key: 'startDt',
    type: 'text',
    value: ''
  },
  {
    label: '종료일자',
    key: 'endDt',
    type: 'text',
    value: ''
  },
  {
    label: '사업자번호',
    key: 'businessNumber',
    type: 'text',
    value: ''
  },
  {
    label: '아이디',
    key: 'companyName',
    type: 'text',
    value: ''
  },
  {
    label: '사용자명',
    key: 'userName',
    type: 'text',
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
const headers = [
  { title: '사업자번호', key: 'businessNumber' },
  { title: '아이디', key: 'userId' },
  { title: '사용자명', key: 'userName' },
  { title: '관리자여부', key: 'adminYn' },
  { title: '로그인여부', key: 'loginYn' },
  { title: '등록일', key: 'regDt' }
];
const items = ref([]);
const selectedItems = ref([]);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await retrieveLoginLog(searchParams.value);
    items.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
