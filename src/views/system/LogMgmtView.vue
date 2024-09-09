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
      <template #item.loginYn="{ value }">
        <VChip :color="value === 'Y' ? 'primary' : 'secondary'">
          {{ value === 'Y' ? '로그인' : '로그아웃' }}
        </VChip>
      </template>

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
import { useDate } from 'vuetify';

const { newToast } = useToast();
const { format } = useDate();

// 검색 조건
const searchFilters = ref([
  {
    label: '일자',
    key: 'dateRange',
    type: 'dateRange',
    value: [new Date(), new Date()],
    cols: '3'
  },
  {
    label: '사업자번호',
    key: 'businessNumber',
    type: 'text',
    value: ''
  },
  {
    label: '업체명',
    key: 'companyName',
    type: 'text',
    value: ''
  },
  {
    label: '아이디',
    key: 'userId',
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
  { title: '업체명', key: 'companyName' },
  { title: '아이디', key: 'userId' },
  { title: '사용자명', key: 'userName' },
  { title: '관리자여부', key: 'adminYn' },
  { title: '로그인 상태', key: 'loginYn' },
  { title: '등록일', key: 'regDt' }
];
const items = ref([]);
const selectedItems = ref([]);

const fetchData = async () => {
  loading.value = true;
  try {
    const { dateRange, ...searchParam } = searchParams.value;

    const startDt = dateRange[0];
    const endDt = dateRange.at(-1);

    const params = {
      ...searchParam,
      startDt: format(startDt, 'isoFullDate'),
      endDt: format(endDt, 'isoFullDate')
    };

    const res = await retrieveLoginLog(params);
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
