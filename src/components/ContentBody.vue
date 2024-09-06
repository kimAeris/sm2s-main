<template>
  <VSheet class="flex-grow-1 overflow-hidden">
    <div class="d-flex flex-column ga-2 h-100">
      <div
        class="d-flex align-center justify-space-between"
        style="height: 36px"
      >
        <h6>{{ title }}</h6>
        <div class="d-flex ga-3">
          <VBtn
            v-for="(button, i) in buttons"
            :key="i"
            :prepend-icon="getIcon(button.icon)"
            :variant="button.variant || 'outlined'"
            :color="button.color"
            rounded="xl"
            @click="button.event"
          >
            {{ button.title }}
          </VBtn>
          <VBtn
            v-if="canAdd"
            :prepend-icon="getIcon('add')"
            variant="outlined"
            rounded="xl"
            @click="addHandler"
          >
            추가
          </VBtn>
          <VBtn
            v-if="canSave"
            :prepend-icon="getIcon('save')"
            variant="outlined"
            rounded="xl"
            @click="handleSave"
          >
            저장
          </VBtn>
          <VBtn
            v-if="canDelete"
            :prepend-icon="getIcon('delete')"
            color="error"
            variant="outlined"
            rounded="xl"
            @click="handleDelete"
          >
            삭제
          </VBtn>
        </div>
      </div>
      <VDivider />

      <slot />
    </div>
  </VSheet>
</template>

<script setup>
import { useFeedback } from '@/stores/useFeedback';
import { useToast } from '@/stores/useToast';
import { getIcon } from '@/utils/common';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  title: {
    type: String,
    default: '목록'
  },
  buttons: {
    type: Array,
    default: () => []
  },
  canAdd: {
    type: Boolean,
    default: false
  },
  canDelete: {
    type: Boolean,
    default: false
  },
  canSave: {
    type: Boolean,
    default: false
  },
  headers: {
    type: Array,
    default: () => []
  },
  selectedItems: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  addItems: {
    type: Array,
    default: () => []
  },
  defaultItemValue: {
    type: Object
  },
  itemKey: {
    type: String,
    default: 'rowId'
  }
});

const emits = defineEmits([
  'update:items',
  'update:addItems',
  'update:selectedItems',
  'saveHandler',
  'deleteHandler'
]);

const defaultItems = props.headers.reduce((acc, header) => {
  if (header.key === 'useYn') acc[header.key] = 'Y';
  else acc[header.key] = '';
  return acc;
}, {});

const addHandler = () => {
  const newItem = JSON.parse(JSON.stringify(defaultItems));
  newItem[props.itemKey] = uuidv4();

  if (props.defaultItemValue?.length > 0) {
    props.defaultItemValue.forEach((item) => {
      newItem[item.key] = item.value;
    });
  }

  emits('update:items', [newItem, ...props.items]);
  emits('update:addItems', [newItem, ...props.addItems]);
  emits('update:selectedItems', [newItem, ...props.selectedItems]);
};

const { openFeedback } = useFeedback();
const { newToast } = useToast();

const handleSave = async () => {
  if (props.selectedItems.length < 1) {
    newToast('데이터를 선택해주세요.', 'error');
    return;
  }

  emits('saveHandler');
};

const handleDelete = async () => {
  if (props.selectedItems.length < 1) {
    newToast('데이터를 선택해주세요.', 'error');
    return;
  }

  const feedback = await openFeedback(
    'error',
    'DELETE',
    '삭제하시겠습니까?',
    '취소',
    '삭제'
  );

  if (!feedback) return;

  emits('deleteHandler');
};
</script>
