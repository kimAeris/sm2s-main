<template>
  <ContentHeader
    v-model:filters="searchFilters"
    @fetch-data="fetchCompany"
    @refresh="refresh"
  />
  <div class="content-body-row">
    <ContentBody title="업체" max-width="800">
      <VDataTable
        class="h-100 overflow-auto"
        :headers="companyHeaders"
        :items="companyItems"
        :loading="companyLoading"
        return-object
      >
        <template #item.companyName="{ item, value }">
          <a
            :class="
              selectedCompany === item.businessNumber
                ? 'text-primary'
                : 'text-secondary'
            "
            @click="selectCompany(item.businessNumber)"
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
      v-model:selected-items="projectItems"
      can-save
      @save-handler="handleSave"
    >
      <VDataTable
        class="h-100 overflow-auto"
        v-model="selectedItems"
        :headers="projectHeaders"
        :items="projectItems"
        :loading="projectLoading"
        return-object
        show-select
        @save-handler="handleSave"
      >
        <template #item.grantYn="{ item, value }">
          <VSwitch
            v-if="selectedItems.includes(item)"
            v-model="item.grantYn"
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
  </div>
</template>

<script setup>
import {
  retrieveCompanyProjects,
  updateCompanyProjects
} from '@/api/system/companyProjects';
import { retrieveCompanys } from '@/api/system/companys';
import { useToast } from '@/stores/useToast';
import { computed, onMounted, ref } from 'vue';

const { newToast } = useToast();

const searchFilters = ref([
  {
    label: '업체명',
    key: 'companyName',
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
  fetchCompany();
};

const companyLoading = ref(false);
const companyHeaders = [
  { title: '사업자번호', key: 'businessNumber' },
  { title: '업체명', key: 'companyName' },
  { title: '업종', key: 'businessType' },
  { title: '종목', key: 'item' }
];
const companyItems = ref([]);
const selectedCompany = ref(null);

const fetchCompany = async () => {
  companyLoading.value = true;
  try {
    const res = await retrieveCompanys(searchParams.value);
    companyItems.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    companyLoading.value = false;
  }
};

const selectCompany = (businessNumber) => {
  selectedCompany.value = businessNumber;
  fetchProjects(businessNumber);
};

const projectLoading = ref(false);
const projectHeaders = [
  { title: '프로젝트 코드', key: 'projectCode' },
  { title: '프로젝트명', key: 'projectName' },
  { title: '사용여부', key: 'grantYn' }
];
const projectItems = ref([]);
const selectedItems = ref([]);

const fetchProjects = async (businessNumber) => {
  projectLoading.value = true;
  try {
    const res = await retrieveCompanyProjects({ businessNumber });
    projectItems.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    projectLoading.value = false;
  }
};

const handleSave = async () => {
  projectLoading.value = true;
  try {
    const params = selectedItems.value.map((item) => ({
      projectCode: item.projectCode,
      businessNumber: selectedCompany.value,
      grantYn: item.grantYn
    }));
    const res = await updateCompanyProjects({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    projectLoading.value = false;
  }
};

onMounted(() => {
  fetchCompany();
});
</script>
