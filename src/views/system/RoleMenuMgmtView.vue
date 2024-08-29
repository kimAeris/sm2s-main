<template>
  <ContentHeader :is-filter="false" />
  <div class="content-body-row">
    <ContentBody title="권한" max-width="600">
      <VDataTable
        class="h-100 overflow-auto"
        :headers="roleHeaders"
        :items="roleItems"
        :loading="roleLoading"
        return-object
        show-select
      >
        <template #item.roleName="{ item, value }">
          <a
            :class="
              selectedRole === item.roleCode ? 'text-primary' : 'text-secondary'
            "
            @click="selectRole(item)"
          >
            {{ value }}
          </a>
        </template>

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>
    <ContentBody
      v-model:selected-items="selectedItems"
      can-save
      @save-handler="saveHandler"
    >
      <VDataTable
        class="h-100 overflow-auto"
        v-model="selectedItems"
        :headers="menuHeaders"
        :items="menuItems"
        :loading="menuLoading"
        return-object
        show-select
      >
        <template #item.grantYn="{ item }">
          <VSwitch
            v-model="item.grantYn"
            :disabled="!selectedItems.includes(item)"
            false-value="N"
            true-value="Y"
            hide-details
          >
          </VSwitch>
        </template>

        <template #loading>
          <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
        </template>
      </VDataTable>
    </ContentBody>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRoles } from '@/api/system/roles';
import { useToast } from '@/stores/useToast';
import { getRoleMenus, saveRoleMenus } from '@/api/system/roleMenus';

const roleLoading = ref(false);
const menuLoading = ref(false);

const { newToast } = useToast();

const roleHeaders = ref([
  {
    title: '프로젝트명',
    key: 'projectName'
  },
  { title: '권한명', key: 'roleName' },
  { title: '권한 설명', key: 'roleDesc' }
]);

const selectedRole = ref(null);
const roleItems = ref([]);
const getRolesData = async () => {
  roleLoading.value = true;
  try {
    const res = await getRoles();
    roleItems.value = res;
    selectedRole.value = res[0].roleCode;

    getMenusData(res[0].projectCode, res[0].roleCode);
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    roleLoading.value = false;
  }
};

const menuHeaders = ref([
  { title: '메뉴 코드', key: 'menuCode' },
  { title: '메뉴명', key: 'menuName' },
  { title: '메뉴 설명', key: 'menuDesc' },
  { title: '권한여부', key: 'grantYn' }
]);

const menuItems = ref([]);
const selectedItems = ref([]);

const selectRole = async (item) => {
  selectedRole.value = item.roleCode;
  getMenusData(item.projectCode, item.roleCode);
};

const getMenusData = async (projectCode, roleCode) => {
  menuLoading.value = true;
  try {
    const res = await getRoleMenus({
      projectCode: projectCode,
      roleCode: roleCode
    });
    menuItems.value = res;
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  } finally {
    menuLoading.value = false;
  }
};

const saveHandler = async () => {
  try {
    const params = selectedItems.value.map((item) => ({
      projectCode: item.projectCode,
      roleCode: selectedRole.value,
      menuCode: item.menuCode,
      grantYn: item.grantYn
    }));
    const res = await saveRoleMenus({ list: params });

    if (res.header.code === 200) {
      newToast('저장되었습니다', 'success');
      getRolesData();

      selectedItems.value = [];
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error(error);
    newToast(error, 'error');
  }
};
onMounted(() => {
  getRolesData();
});
</script>
