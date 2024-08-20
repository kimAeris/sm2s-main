<template>
  <ContentHeader v-model:filters="searchFilters" />

  <ContentBody
    :headers="headers"
    v-model:items="items"
    v-model:selectedItems="selectedItems"
    canAdd
    canDelete
    @deleteHandler="deleteHandler"
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
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const searchFilters = ref([
  {
    label: '프로젝트명',
    type: 'text',
    value: '',
    cols: 3
  },
  {
    label: 'SMWP 사용 여부',
    type: 'selectUse',
    value: ''
  },
  {
    label: '사용여부',
    type: 'selectUse',
    value: ''
  }
]);

const headers = [
  { title: '프로젝트명', key: 'name' },
  {
    title: 'SMWP 사용 여부',
    key: 'division'
  },
  { title: '사용여부', key: 'ownerName' }
];

const selectedItems = ref([]);
const items = ref([{ name: 'test', division: 'test1', ownerName: 'test2' }]);

const deleteHandler = () => {
  loading.value = true;
  try {
    console.log('delete!');
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => (loading.value = false), 1000);
  }
};
</script>
