<template>
  <ContentHeader v-model:filters="searchFilters" />

  <ContentBody :buttons="headerButtons">
    <VDataTable
      class="h-100 overflow-auto"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      :loading="loading"
      return-object
      show-select
    >
      <template #item.name="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.name"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.division="{ item, value }">
        <VSelect
          v-if="selectedItems.includes(item)"
          v-model="item.division"
          :items="headers.find((header) => header.key === 'division').items"
          item-title="title"
          item-value="value"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

      <template #item.ownerName="{ item, value }">
        <VTextField
          v-if="selectedItems.includes(item)"
          v-model="item.ownerName"
          variant="outlined"
          density="compact"
          hide-details
        />
        <span v-else>
          {{ value }}
        </span>
      </template>

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

      <template #loading>
        <VSkeletonLoader type="table-row@10" />
      </template>
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { getIcon } from '@/utils/common';

const loading = ref(false);

const searchFilters = ref([
  {
    label: '사업자 번호',
    type: 'text',
    value: '22'
  },
  {
    label: '조건1',
    type: 'select',
    value: 'value',
    options: [
      {
        key: '1',
        value: '1-1'
      },
      {
        key: '2',
        value: '1-2'
      }
    ]
  }
]);

const headers = [
  { title: '거래처코드', key: 'code' },
  { title: '거래처명', key: 'name' },
  {
    title: '거래처구분',
    key: 'division',
    items: [
      { title: '1-1', value: '1' },
      { title: '1-2', value: '2' }
    ]
  },
  { title: '대표자명', key: 'ownerName' },
  { title: '사업자번호', key: 'businessNumber' }
];

const selectedItems = ref([]);
const items = ref([
  {
    code: '1',
    name: 'Fern',
    division: 'Yes',
    ownerName: 'test',
    businessNumber: 20
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '2',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '3',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  },
  {
    code: '4',
    name: 'Snake Plant',
    division: 'No',
    ownerName: 'test',
    businessNumber: 35
  }
]);

const defaultItems = headers.reduce((acc, header) => {
  acc[header.key] = '';
  return acc;
}, {});

const addHandler = () => {
  const newItem = JSON.parse(JSON.stringify(defaultItems));
  newItem.code = uuidv4();

  selectedItems.value.push(newItem);
  items.value = [newItem, ...items.value];
};

const deleteHandler = () => {
  loading.value = true;
  try {
    items.value = items.value.filter(
      (item) => !selectedItems.value.includes(item)
    );
    selectedItems.value = [];
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => (loading.value = false), 1000);
  }
};

const headerButtons = [
  {
    title: '추가',
    icon: getIcon('add'),
    event: addHandler
  },
  {
    title: '저장',
    icon: getIcon('save')
  },
  {
    title: '삭제',
    icon: getIcon('delete'),
    color: 'error',
    event: deleteHandler
  }
];
</script>
