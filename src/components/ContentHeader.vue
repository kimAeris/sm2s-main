<template>
  <VSheet class="mb-4">
    <div class="text-body-1 d-flex align-center mb-4">
      <span class="mr-1"> {{ mainMenu.menuNm }} > </span>
      <span class="font-weight-bold text-primary">
        {{ currentPage.menuNm }}
      </span>
    </div>

    <div class="d-flex align-center justify-space-between">
      <!-- <div class="d-flex w-100 align-center ga-4 py-2 mb-3 px-4"> -->
      <VRow class="d-flex">
        <VCol v-for="(filter, i) in filters" :cols="filter.cols || 2" :key="i">
          <template v-if="filter.type === 'text'">
            <VTextField
              :label="filter.label"
              @input="updateValue(i, $event.target.value)"
              bg-color="surface"
              variant="outlined"
              density="compact"
              hide-details
            >
            </VTextField>
          </template>

          <template v-if="filter.type === 'select'">
            <VSelect
              :label="filter.label"
              :items="filter.options"
              @update:modelValue="updateValue(i, $event)"
              item-title="value"
              item-value="key"
              bg-color="surface"
              variant="outlined"
              density="compact"
              hide-details
            >
            </VSelect>
          </template>

          <template v-if="filter.type === 'selectUse'">
            <VSelect
              :label="filter.label"
              :items="useOptions"
              @update:modelValue="updateValue(i, $event)"
              item-title="title"
              item-value="value"
              bg-color="surface"
              variant="outlined"
              density="compact"
              hide-details
            >
              <template #item="{ props, item }">
                <VListItem v-bind="props" :title="undefined">
                  <div class="d-flex align-center ga-2">
                    <VBadge :color="item.raw?.status" inline dot></VBadge>
                    <span> {{ item.raw.title }}</span>
                  </div>
                </VListItem>
              </template>
            </VSelect>
          </template>
        </VCol>
      </VRow>

      <VBtn
        prepend-icon="mdi-magnify"
        variant="outlined"
        rounded="xl"
        @click="emits('fetchData')"
      >
        조회
      </VBtn>
    </div>
  </VSheet>
</template>

<script setup>
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const { mainMenu, currentPage } = storeToRefs(useMenu());

const props = defineProps({
  filters: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['update:filters', 'fetchData']);

const updateValue = (index, value) => {
  const updatedFilters = [...props.filters];
  updatedFilters[index].value = value;

  emits('update:filters', updatedFilters);
};

const useOptions = [
  { title: '사용', value: 'Y', status: 'success' },
  { title: '미사용', value: 'N' }
];

onMounted(() => {
  emits('fetchData');
});
</script>
