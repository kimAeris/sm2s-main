<template>
  <VMenu v-model="visible" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <VTextField
          v-model="datePickerText"
          :label="label ? label : ''"
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
      multiple="range"
      color="primary"
      show-adjacent-months
      hide-header
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
    type: Object,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:model-value']);

const datePicker = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:model-value', value);
    if (value.length > 1) closePicker();
  }
});

const datePickerText = computed(() => {
  if (datePicker.value.length > 1) {
    const startDt = format(datePicker.value[0], 'isoFullDate');
    const endDt = format(datePicker.value.at(-1), 'isoFullDate');
    return `${startDt} ~ ${endDt}`;
  } else return '';
});

const closePicker = () => {
  visible.value = false;
};
</script>
