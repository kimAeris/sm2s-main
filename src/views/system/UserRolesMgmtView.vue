<template>
  <!-- <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchData"
    @refresh="refresh"
  /> -->
  <ContentHeader :is-filter="false" />

  <div class="content-body-row">
    <ContentBody title="사용자" max-width="560">
      <VDataTable
        class="h-100 overflow-auto"
        :headers="userHeaders"
        :items="userItems"
        :loading="userLoading"
        return-object
      >
        <template #item.userName="{ item, value }">
          <a
            :class="
              selectedUserCode === item.userCode
                ? 'text-primary'
                : 'text-secondary'
            "
            @click="selectUser(item.userCode)"
          >
            {{ value }}
          </a>
        </template>

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>

    <ContentBody
      :headers="headers"
      v-model:items="items"
      v-model:selected-items="selectedItems"
      can-save
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
        <template #item.grantYn="{ item }">
          <VSwitch
            v-model="item.grantYn"
            :disabled="!selectedItems.includes(item)"
            false-value="N"
            true-value="Y"
            hide-details
          >
          </VSwitch>
        </template>

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from '@/stores/useToast';
import { getUserList } from '@/api/user';
import { getUserRoles, saveUserRoles } from '@/api/system/userRoles';

const { newToast } = useToast();

// const searchFilters = ref([
//   {
//     label: '사용자코드',
//     key: 'userCode',
//     type: 'text',
//     value: '',
//     cols: 3
//   }
// ]);

// const searchParams = computed(() => {
//   const params = {};
//   searchFilters.value.forEach((filter) => {
//     if (filter?.value) {
//       params[filter.key] = filter.value;
//     }
//   });
//   return params;
// });

// const originFilters = JSON.parse(JSON.stringify(searchFilters.value));

// const refresh = () => {
//   searchFilters.value = JSON.parse(JSON.stringify(originFilters));
//   fetchData();
// };

const userLoading = ref(false);
const userItems = ref([]);
const userHeaders = [
  { title: '사업자번호', key: 'businessNumber' },
  { title: '업체명', key: 'companyName' },
  { title: '아이디', key: 'userId' },
  { title: '사용자명', key: 'userName' }
];

const selectedUserCode = ref(null);
const selectUser = (userCode) => {
  selectedUserCode.value = userCode;
  fetchData(userCode);
};

const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const headers = [
  { title: '프로젝트명', key: 'projectName' },
  { title: '프로젝트 설명', key: 'projectDesc' },
  { title: '권한명', key: 'roleName' },
  { title: '권한 여부', key: 'grantYn' }
];

const fetchUserData = async () => {
  userLoading.value = true;
  try {
    const res = await getUserList({ adminYn: 'N' });
    userItems.value = res;

    selectUser(res[0].userCode);
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    userLoading.value = false;
  }
};

const fetchData = async (userCode) => {
  loading.value = true;
  try {
    const res = await getUserRoles({ userCode });
    items.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const saveHandler = async () => {
  try {
    const params = selectedItems.value.map((item) => ({
      userCode: selectedUserCode.value,
      roleCode: item.roleCode,
      grantYn: item.grantYn
    }));
    const res = await saveUserRoles({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      fetchUserData();

      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  }
};

onMounted(() => {
  fetchUserData();
  // fetchData();
});
</script>
