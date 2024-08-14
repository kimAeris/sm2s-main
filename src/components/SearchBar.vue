<template>
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
</template>

<script setup></script>
