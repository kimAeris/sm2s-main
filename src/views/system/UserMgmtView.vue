<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchData"
    @refresh="refresh"
  />

  <ContentBody
    :headers="headers"
    :buttons="buttons"
    v-model:items="items"
    v-model:addItems="addItems"
    v-model:selected-items="selectedItems"
    :default-item-value="defaultItemValue"
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
      <template #item.businessNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item) && item.rowId"
          style="min-width: 140px !important"
          v-model="item.businessNumber"
          placeholder="000-00-00000"
          maxlength="12"
          variant="outlined"
          density="compact"
          hide-details
          @input="setBusinessNumber($event, item)"
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.userId="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item) && item.rowId"
          v-model="item.userId"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.userName="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.userName"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.phoneNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.phoneNumber"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.address="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.address"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.detailedAddress="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.detailedAddress"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.departmentCode="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.departmentCode"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.positionCode="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.positionCode"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.resignYn="{ item, value }">
        <VSwitch
          v-if="selectedItems.includes(item)"
          v-model="item.resignYn"
          false-value="N"
          true-value="Y"
          hide-details
        >
        </VSwitch>

        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.adminYn="{ item, value }">
        <VSwitch
          v-if="selectedItems.includes(item)"
          v-model="item.adminYn"
          false-value="N"
          true-value="Y"
          hide-details
        >
        </VSwitch>

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
import { deleteUser, getUserList, initPassword, saveUser } from '@/api/user';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';
import { formatBusinessNumber } from '@/utils/common';

const loading = ref(false);

const setBusinessNumber = (event, item) => {
  item.businessNumber = formatBusinessNumber(event.target);
};

const searchFilters = ref([
  {
    label: '사업자번호',
    key: 'businessNumber',
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
  },
  {
    label: '관리자여부',
    key: 'adminYn',
    type: 'select',
    value: '',
    options: [
      {
        title: '전체',
        value: ''
      },
      {
        title: 'Y',
        value: 'Y'
      },
      {
        title: 'N',
        value: 'N'
      }
    ],
    cols: 1
  }
]);

const originFilters = JSON.parse(JSON.stringify(searchFilters.value));

const refresh = () => {
  // 깊은 복사로 강제로 반응성 트리거
  searchFilters.value = JSON.parse(JSON.stringify(originFilters));
  fetchData();
};

const headers = [
  { title: '사업자번호 코드', key: 'businessNumber' },
  { title: '아이디', key: 'userId' },
  { title: '사용자명', key: 'userName' },
  { title: '전화번호', key: 'phoneNumber' },
  { title: '주소', key: 'address' },
  { title: '상세 주소', key: 'detailedAddress' },
  { title: '부서코드', key: 'departmentCode' },
  {
    title: '직위코드',
    key: 'positionCode'
  },
  { title: '퇴사여부', key: 'resignYn' },
  { title: '관리자여부', key: 'adminYn' },
  { title: '사용여부', key: 'useYn' },
  { title: '초기화여부', key: 'initYn' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

const setInitPassword = async () => {
  loading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      userCode: item.userCode,
      userId: item.userId
    }));
    const res = await initPassword({ list: params });

    if (res.header.code === 200) {
      newToast('초기화되었습니다', 'success');

      selectedItems.value = [];
      fetchData();
    } else throw res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('초기화를 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const buttons = [
  {
    title: '비밀번호 초기화',
    event: setInitPassword
  }
];

const searchParams = computed(() => {
  const params = {};
  searchFilters.value.forEach((filter) => {
    if (filter?.value) {
      params[filter.key] = filter.value;
    }
  });
  return params;
});

const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);
const defaultItemValue = [
  { key: 'resignYn', value: 'N' },
  { key: 'adminYn', value: 'N' }
];

const { newToast } = useToast();
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getUserList(searchParams.value);
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
    const params = selectedItems.value.map((item) => {
      if (item.rowId) {
        item.userCode = null;
        delete item.rowId;
        delete item.regDt;
        delete item.regNm;
        delete item.chgNm;
        delete item.chgDt;
      }
      return item;
    });
    const res = await saveUser({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');

      selectedItems.value = [];
      fetchData();
    } else throw res;
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
      userCode: item.userCode
    }));
    const res = await deleteUser({ list: params });

    if (res.header.code === 200) {
      newToast('삭제되었습니다', 'success');

      items.value = items.value.filter(
        (item) => !selectedItems.value.includes(item)
      );
      selectedItems.value = [];
    } else throw res;
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
