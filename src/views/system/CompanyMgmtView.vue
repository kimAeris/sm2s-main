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
    <VForm ref="form" validate-on="input">
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
            :rules="[businessRules]"
            @input="setBusinessNumber($event, item)"
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

        <template #item.website="{ item, value }">
          <VTextField
            v-if="selectedItems.includes(item)"
            v-model="item.website"
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
    </VForm>
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
import { formatBusinessNumber } from '@/utils/common';
import { validBusinessNumber } from '@/utils/regex';

const form = ref(null);
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
  { title: '웹사이트', key: 'website' },
  { title: '사용여부', key: 'useYn' },
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
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

const setBusinessNumber = (event, item) => {
  item.businessNumber = formatBusinessNumber(event.target);
};

const businessRules = (v) => validBusinessNumber(v);

const checkValidForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate();

    if (!valid) {
      newToast('사업자번호를 확인해주세요', 'error');
      return false;
    }
  }
  return true;
};

const saveHandler = async () => {
  const isValid = await checkValidForm();
  if (!isValid) return;

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

    await saveCompanys({ list: params });

    newToast('저장되었습니다', 'success');

    fetchData();
    selectedItems.value = [];
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
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
    newToast(error, 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
