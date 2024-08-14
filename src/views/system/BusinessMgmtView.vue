<template>
  <ContentHeader :buttons="headerButtons" />

  <SearchBar />

  <ContentBody>
    <VDataTable
      :headers="headers"
      :items="plants"
      :loading="loading"
      class="h-100 overflow-auto"
    >
      <template #loading>
        <VSkeletonLoader type="table-row@10" />
      </template>
    </VDataTable>
  </ContentBody>
</template>

<script setup>
import ContentHeader from '@/components/ContentHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import ContentBody from '@/components/ContentBody.vue';

const headerButtons = [
  {
    title: '추가',
    icon: 'mdi-plus-box-outline'
  },
  {
    title: '저장',
    icon: 'mdi-content-save-outline'
  },
  {
    title: '삭제',
    icon: 'mdi-trash-can-outline',
    color: 'error'
  },
  {
    title: '엑셀',
    icon: 'mdi-microsoft-excel',
    color: 'green-darken-2'
  }
];

const headers = [
  { title: 'Plant', key: 'name' },
  { title: 'Light', key: 'light' },
  { title: 'Height', key: 'height' },
  { title: 'Pet Friendly', key: 'petFriendly' },
  { title: 'Price ($)', key: 'price' }
];
const plants = [
  {
    name: 'Fern',
    light: 'Low',
    height: '20cm',
    petFriendly: 'Yes',
    price: 20
  },
  {
    name: 'Snake Plant',
    light: 'Low',
    height: '50cm',
    petFriendly: 'No',
    price: 35
  },
  {
    name: 'Monstera',
    light: 'Medium',
    height: '60cm',
    petFriendly: 'No',
    price: 50
  },
  {
    name: 'Pothos',
    light: 'Low to medium',
    height: '40cm',
    petFriendly: 'Yes',
    price: 25
  },
  {
    name: 'ZZ Plant',
    light: 'Low to medium',
    height: '90cm',
    petFriendly: 'Yes',
    price: 30
  },
  {
    name: 'Spider Plant',
    light: 'Bright, indirect',
    height: '30cm',
    petFriendly: 'Yes',
    price: 15
  }
];
</script>
