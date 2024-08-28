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
      <template #item.businessNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.businessNumber"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.companyName="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.companyName"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.companyAlias="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.companyAlias"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.ceo="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.ceo"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.businessType="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.businessType"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.item="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item['item']"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.postalCode="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.postalCode"
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

      <template #item.openingDate="{ item, value }">
        <AppDatePicker
          v-if="selectedItems.includes(item)"
          v-model="item.openingDate"
        />

        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.corporateNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.corporateNumber"
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

      <template #item.faxNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.faxNumber"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.email="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.email"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.manager="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.manager"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.managerPhoneNumber="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.managerPhoneNumber"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.webSite="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.webSite"
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
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';
import {
  getCompanys,
  saveCompanys,
  deleteCompanys
} from '@/api/system/companys';

import AppDatePicker from '@/components/app/AppDatePicker.vue';

const loading = ref(false);
const selectedItems = ref([]);
const items = ref([]);
const addItems = ref([]);

const searchFilters = ref([
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
  // 깊은 복사로 강제로 반응성 트리거
  searchFilters.value = JSON.parse(JSON.stringify(originFilters));
  fetchData();
};

const headers = [
  { title: '사업자번호', key: 'businessNumber' },
  { title: '업체명', key: 'companyName' },
  { title: '업체별칭', key: 'companyAlias' },
  { title: '대표자명', key: 'ceo' },
  { title: '업종', key: 'businessType' },
  { title: '종목', key: 'item' },
  { title: '우편번호', key: 'postalCode' },
  { title: '주소', key: 'address' },
  { title: '상세 주소', key: 'detailedAddress' },
  { title: '개업일', key: 'openingDate' },
  { title: '법인번호', key: 'corporateNumber' },
  { title: '전화번호', key: 'phoneNumber' },
  { title: 'FAX번호', key: 'faxNumber' },
  { title: '이메일', key: 'email' },
  { title: '담당자', key: 'manager' },
  { title: '담당자 전화번호', key: 'managerPhoneNumber' },
  { title: '웹사이트', key: 'webSite' },
  { title: '사용여부', key: 'useYn' },
  { title: '정렬번호', key: 'sortNo' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

const { newToast } = useToast();
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getCompanys(searchParams.value);
    items.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const saveHandler = async () => {
  loading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      businessNumber: item.businessNumber,
      companyName: item.companyName,
      companyAlias: item.companyAlias,
      ceo: item.ceo,
      businessType: item.businessType,
      item: item.item,
      postalCode: item.postalCode,
      address: item.address,
      detailedAddress: item.detailedAddress,
      openingDate: item.openingDate,
      corporateNumber: item.corporateNumber,
      phoneNumber: item.phoneNumber,
      faxNumber: item.faxNumber,
      email: item.email,
      manager: item.manager,
      managerPhoneNumber: item.managerPhoneNumber,
      website: item.website,
      useYn: item.useYn
    }));
    const res = await saveCompanys({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');

      fetchData();
      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('저장을 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const deleteHandler = async () => {
  loading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      businessNumber: item.businessNumber
    }));
    const res = await deleteCompanys({ list: params });

    if (res.header.code === 200) {
      newToast('삭제되었습니다', 'success');

      items.value = items.value.filter(
        (item) => !selectedItems.value.includes(item)
      );
      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast('삭제를 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
