<template>
  <VSheet class="d-flex align-center ga-4 py-2 mb-3 px-4 p" rounded border>
    <VRow>
      <VCol v-for="(filter, i) in filters" :cols="filter.cols || 3" :key="i">
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
            :items="filter.options"
            @update:modelValue="updateValue(i, $event)"
            item-title="value"
            item-value="key"
            bg-color="surface"
            variant="outlined"
            density="compact"
            hide-details
          >
            <template #prepend>
              <span class="text-body-2"> {{ filter.label }} </span>
            </template>
          </VSelect>
        </template>
      </VCol>
    </VRow>
    <VBtn prepend-icon="mdi-magnify">조회</VBtn>
  </VSheet>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:filters']);

const updateValue = (index, value) => {
  const updatedFilters = [...props.filters];
  updatedFilters[index].value = value;

  emit('update:filters', updatedFilters);
};
</script>
