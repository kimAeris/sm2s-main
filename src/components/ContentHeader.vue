<template>
  <VSheet class="mb-4">
    <div
      class="text-body-1 d-flex align-center"
      :class="isFilter ? ' mb-4' : 'my-1'"
    >
      <span class="mr-1"> {{ mainMenu.menuName }} > </span>
      <span class="font-weight-bold text-primary">
        {{ currentPage.menuName }}
      </span>
    </div>

    <div v-if="isFilter" class="d-flex align-end justify-space-between">
      <!-- <div class="d-flex w-100 align-center ga-4 py-2 mb-3 px-4"> -->
      <VRow class="mr-3">
        <VCol
          v-for="(filter, i) in filters"
          :cols="filter.cols || 2"
          :key="i"
          style="min-width: 160px"
        >
          <template v-if="filter.type === 'date'">
            <AppDatePicker v-model="filter.value" :label="filter.label" />
          </template>

          <template v-if="filter.type === 'text'">
            <VTextField
              v-model="filter.value"
              :label="filter.label"
              @input="updateValue(i, $event.target.value)"
              @keyup.enter="emits('fetchData')"
              bg-color="surface"
              variant="outlined"
              density="compact"
              hide-details
            >
            </VTextField>
          </template>

          <template v-if="filter.type === 'select'">
            <VSelect
              v-model="filter.value"
              :label="filter.label"
              :items="filter.options"
              @update:modelValue="updateValue(i, $event)"
              item-title="title"
              item-value="value"
              bg-color="surface"
              variant="outlined"
              density="compact"
              hide-details
            >
            </VSelect>
          </template>

          <template v-if="filter.type === 'selectUse'">
            <VSelect
              v-model="filter.value"
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
              <template #prepend-inner>
                <VBadge
                  :color="
                    useOptions.find((option) => option.value === filter.value)
                      .status
                  "
                  inline
                  dot
                >
                </VBadge>
              </template>
              <template #item="{ props, item }">
                <VListItem v-bind="props" :title="undefined">
                  <div class="badge-text">
                    <VBadge :color="item.raw?.status" inline dot></VBadge>
                    <span> {{ item.raw.title }}</span>
                  </div>
                </VListItem>
              </template>
            </VSelect>
          </template>
        </VCol>
      </VRow>

      <div class="d-flex ga-3">
        <VBtn variant="outlined" rounded="xl" @click="emits('refresh')">
          초기화
        </VBtn>
        <VBtn
          prepend-icon="mdi-magnify"
          variant="outlined"
          rounded="xl"
          @click="emits('fetchData')"
        >
          조회
        </VBtn>
      </div>
    </div>
  </VSheet>
</template>

<script setup>
import { useMenu } from '@/stores/useMenu';
import { storeToRefs } from 'pinia';
import AppDatePicker from '@/components/app/AppDatePicker.vue';

const { mainMenu, currentPage } = storeToRefs(useMenu());

const props = defineProps({
  isFilter: {
    type: Boolean,
    default: true
  },
  filters: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['update:filters', 'refresh', 'fetchData']);

const updateValue = (index, value) => {
  const updatedFilters = [...props.filters];
  updatedFilters[index].value = value;

  emits('update:filters', updatedFilters);
};

const useOptions = [
  { title: '전체', value: '', status: 'info' },
  { title: '사용', value: 'Y', status: 'success' },
  { title: '미사용', value: 'N' }
];
</script>
