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
import { getLoginLog } from '@/api/system/log';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';

const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);

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
  },
  {
    label: '퇴사여부',
    key: 'useYn',
    type: 'text',
    value: ''
  },
  {
    label: '관리자여부',
    key: 'useYn',
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

const headers = [
  { title: '사업자번호', key: 'userCode' },
  { title: '사업자번호', key: 'businessNumber' },
  { title: 'branchCode', key: 'branchCode' },
  { title: 'userNumber', key: 'userNumber' },
  { title: '아이디', key: 'userId' },
  { title: '사용자명', key: 'userName' },
  { title: '관리자여부', key: 'adminYn' },
  { title: '부서코드', key: 'departmentCode' },
  { title: '직위코드', key: 'positionCode' },
  { title: 'residentNumber', key: 'residentNumber' },
  { title: '전화번호', key: 'phoneNumber' },
  { title: 'mobileNumber', key: 'mobileNumber' },
  { title: 'postalCode', key: 'postalCode' },
  { title: '주소', key: 'address' },
  { title: '상세 주소', key: 'detailedAddress' },
  { title: 'joinDate', key: 'joinDate' },
  { title: '퇴사여부', key: 'resignYn' },
  { title: 'resignationDate', key: 'resignationDate' },
  { title: '초기화여부', key: 'initYn' },
  { title: '로그인여부', key: 'loginYn' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

const { newToast } = useToast();
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getLoginLog(searchParams.value);
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
