<template>
  <ContentHeader v-model:filters="searchFilters" @fetchData="fetchData" />

  <ContentBody
    :headers="headers"
    v-model:items="items"
    v-model:selectedItems="selectedItems"
    canAdd
    canDelete
    canSave
    @deleteHandler="deleteHandler"
    @saveHandler="saveHandler"
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
      <template #item.projectName="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.projectName"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>
      <template #item.projectDesc="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.projectDesc"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>
      <template #item.url="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.url"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>
      <template #item.smwpYn="{ item, value }">
        <VSwitch
          v-if="selectedItems.includes(item)"
          v-model="item.smwpYn"
          false-value="N"
          true-value="Y"
          color="secondary-variant"
          hide-details
        >
        </VSwitch>

        <span v-else>
          <VBadge :color="value === 'Y' ? 'success' : ''" inline dot />

          {{ value === 'Y' ? '사용' : '미사용' }}
        </span>
      </template>
      <template #item.useYn="{ item, value }">
        <VSwitch
          v-if="selectedItems.includes(item)"
          v-model="item.useYn"
          false-value="N"
          true-value="Y"
          color="secondary-variant"
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
import { getProjects, saveProjects } from '@/api/system/projects';
import { useToast } from '@/stores/useToast';
import { computed, ref } from 'vue';

const loading = ref(false);

const searchFilters = ref([
  {
    label: '프로젝트명',
    key: 'projectName',
    type: 'text',
    value: '',
    cols: 3
  },
  {
    label: 'SMWP 사용 여부',
    key: 'smwpYn',
    type: 'selectUse',
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

const { newToast } = useToast();
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getProjects(searchParams);
    items.value = res.body.list;
  } catch (error) {
    newToast('조회에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const headers = [
  { title: '프로젝트 코드', key: 'projectCode' },
  { title: '프로젝트명', key: 'projectName' },
  { title: '프로젝트 설명', key: 'projectDesc' },
  { title: 'Url', key: 'url' },
  {
    title: 'SMWP 사용 여부',
    key: 'smwpYn'
  },
  { title: '사용여부', key: 'useYn' },
  { title: '등록자', key: 'regNm' },
  { title: '등록일', key: 'regDt' },
  { title: '수정자', key: 'chgNm' },
  { title: '수정일', key: 'chgDt' }
];

const selectedItems = ref([]);
const items = ref([]);

const saveHandler = async () => {
  loading.value = true;
  try {
    const res = await saveProjects({ list: selectedItems.value });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      selectedItems.value = [];
    }
  } catch (error) {
    newToast('저장에 실패했습니다.', 'error');
  } finally {
    loading.value = false;
  }
};

const deleteHandler = () => {
  loading.value = true;
  try {
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => (loading.value = false), 1000);
  }
};
</script>
