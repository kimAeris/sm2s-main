<template>
  <VMenu v-model="visible" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <VTextField
          v-model="datePicker"
          prepend-inner-icon="mdi-calendar-blank"
          variant="outlined"
          density="compact"
          readonly
          hide-details
          style="min-width: 140px !important"
        >
        </VTextField>
      </div>
    </template>

    <VDatePicker
      v-model="datePicker"
      color="primary"
      show-adjacent-months
      hide-header
      @update:model-value="closePicker"
    />
  </VMenu>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDate } from 'vuetify';

const visible = ref(false);

const { format } = useDate();

const props = defineProps({
  modelValue: {
    type: String
  }
});

const emits = defineEmits(['update:model-value']);

const datePicker = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:model-value', format(value, 'isoFullDate'));
  }
});

const closePicker = () => {
  visible.value = false;
};
</script>
