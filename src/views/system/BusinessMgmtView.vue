<template>
  <div class="d-flex flex-column w-100 h-100 overflow-hidden">
    <VSheet
      class="d-flex align-center justify-space-between"
      color="background"
    >
      <span> 시스템 > 사업자 관리 </span>
      <div class="d-flex ga-3">
        <VBtn
          prepend-icon="mdi-microsoft-excel"
          variant="outlined"
          color="green-darken-2"
        >
          엑셀
        </VBtn>
        <VBtn prepend-icon="mdi-plus-box-outline" variant="outlined">추가</VBtn>
        <VBtn
          prepend-icon="mdi-trash-can-outline"
          variant="outlined"
          color="error"
          >삭제</VBtn
        >
      </div>
    </VSheet>
    <VDivider class="border-opacity-50 my-2" />

    <VSheet
      class="d-flex align-center ga-4 py-2 mb-3 px-4 bg-primary"
      elevation="4"
      rounded
    >
      <VRow>
        <VCol cols="3">
          <VTextField
            bg-color="surface"
            variant="outlined"
            density="compact"
            hide-details
          >
            <template #prepend>
              <span class="text-body-2">사업자 번호</span>
            </template>
          </VTextField>
        </VCol>
      </VRow>
      <VBtn prepend-icon="mdi-magnify">조회</VBtn>
    </VSheet>

    <VSheet class="flex-grow-1 overflow-hidden border-opacity-25" border>
      <v-data-table
        :headers="headers"
        :items="plants"
        :loading="loading"
        fixed-header
        class="h-100 overflow-auto"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10" />
        </template>
      </v-data-table>
    </VSheet>
  </div>
</template>

<script setup>
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
  },
  {
    name: 'Air Plant',
    light: 'Bright, indirect',
    height: '15cm',
    petFriendly: 'Yes',
    price: 10
  },
  {
    name: 'Peperomia',
    light: 'Bright, indirect',
    height: '25cm',
    petFriendly: 'Yes',
    price: 20
  },
  {
    name: 'Aloe Vera',
    light: 'Bright, direct',
    height: '30cm',
    petFriendly: 'Yes',
    price: 15
  },
  {
    name: 'Jade Plant',
    light: 'Bright, direct',
    height: '40cm',
    petFriendly: 'Yes',
    price: 25
  },
  {
    name: 'Aloe Vera',
    light: 'Bright, direct',
    height: '30cm',
    petFriendly: 'Yes',
    price: 15
  },
  {
    name: 'Jade Plant',
    light: 'Bright, direct',
    height: '40cm',
    petFriendly: 'Yes',
    price: 25
  },
  {
    name: 'Aloe Vera',
    light: 'Bright, direct',
    height: '30cm',
    petFriendly: 'Yes',
    price: 15
  },
  {
    name: 'Jade Plant',
    light: 'Bright, direct',
    height: '40cm',
    petFriendly: 'Yes',
    price: 25
  }
];
</script>
