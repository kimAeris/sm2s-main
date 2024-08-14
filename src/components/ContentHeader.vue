<template>
  <VSheet class="d-flex align-center justify-space-between" color="background">
    <span> 시스템 > 사업자 관리 </span>

    <div class="d-flex ga-3">
      <VBtn prepend-icon="mdi-plus-box-outline" variant="outlined">추가</VBtn>
      <VBtn prepend-icon="mdi-content-save-outline" variant="outlined">
        저장
      </VBtn>
      <VBtn
        prepend-icon="mdi-trash-can-outline"
        variant="outlined"
        color="error"
      >
        삭제
      </VBtn>
      <VBtn
        prepend-icon="mdi-microsoft-excel"
        variant="outlined"
        color="green-darken-2"
      >
        엑셀
      </VBtn>
    </div>
  </VSheet>
  <VDivider class="border-opacity-50 my-2" />
</template>

<script setup></script>
