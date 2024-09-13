<template>
  <div class="w-100 h-100 bg-background pa-12 d-flex">
    <VCard class="ma-auto px-12 py-8" min-width="600" elevation="12">
      <VForm ref="loginForm" @submit.prevent>
        <h4 class="mb-6 text-primary text-center font-weight-bold">SM2S</h4>

        <div class="d-flex flex-column ga-2">
          <VTextField
            v-model="businessNumber"
            label="사업자 번호"
            variant="outlined"
            clearable
            prepend-inner-icon="mdi-domain"
            placeholder="000-00-00000"
            maxlength="12"
            @input="setBusinessNumber($event)"
            required
            :rules="[businessRules]"
          />
          <VTextField
            v-model="id"
            label="아이디"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            clearable
            required
            :rules="[(v) => !!v || '아이디를 입력하세요']"
          />
          <VTextField
            v-model="pw"
            label="비밀번호"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordVisible ? 'text' : 'password'"
            clearable
            required
            :rules="[(v) => !!v || '비밀번호를 입력하세요']"
            @click:append-inner="passwordVisible = !passwordVisible"
          />
        </div>

        <VCheckbox
          v-model="loginInfoSaved"
          label="로그인 정보 저장"
          density="compact"
          hide-details
        />

        <VBtn
          class="mt-2"
          color="primary"
          type="submit"
          size="large"
          rounded="lg"
          block
          :loading="loading"
          @click="handleLogin"
        >
          로그인
        </VBtn>
      </VForm>
    </VCard>
  </div>

  <PasswordChangeModal :visible="passwordModal" @close="closePasswordModal" />
  <ProjectSelector :visible="projectModal" @close="closeProjectModal" />
</template>

<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import { login } from '@/api/common';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { useToast } from '@/stores/useToast';
import PasswordChangeModal from '@/components/modals/PasswordChangeModal.vue';
import ProjectSelector from '@/components/modals/ProjectSelectorModal.vue';
import { useMenu } from '@/stores/useMenu';
import { formatBusinessNumber } from '@/utils/common';

const { accessToken, refreshToken, user, projectList } = storeToRefs(useUser());
const { newToast } = useToast();
const { menus } = storeToRefs(useMenu());

const loading = ref(false);

// 로그인 폼
const loginForm = ref(null);
const businessNumber = ref(null);
const id = ref(null);
const pw = ref(null);
const passwordVisible = ref(false);
const loginInfoSaved = ref(false);

// 프로젝트 선택 모달
const projectModal = ref(false);

const openProjectModal = () => {
  projectModal.value = true;
};
const closeProjectModal = () => {
  projectModal.value = false;
};

// 패스워드 변경 모달
const passwordModal = ref(false);
const closePasswordModal = () => (passwordModal.value = false);

// 사업자번호 관련 로직
const setBusinessNumber = (event) => {
  businessNumber.value = formatBusinessNumber(event.target);
};
const businessRules = (v) => {
  if (!v) {
    return '사업자 번호를 입력하세요.';
  } else if (v.length < 12) {
    return '사업자 번호는 10자리 입니다.';
  }
  return true;
};

// 로그인 이벤트 핸들러
const handleLogin = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  loading.value = true;

  try {
    const res = await login(businessNumber.value, id.value, pw.value);
    if (res.header.code === 200) {
      accessToken.value = res.body.Authorization;
      refreshToken.value = res.body.refreshToken;
      user.value = res.body.userInfo;
      projectList.value = res.body.projectList;

      // 로그인 정보 기억
      if (loginInfoSaved.value) {
        localStorage.setItem(
          'info',
          JSON.stringify({
            businessNumber: businessNumber.value,
            id: id.value
          })
        );
      } else {
        localStorage.removeItem('info');
      }

      if (user.value.initYn === 'Y') {
        passwordModal.value = true;
      } else {
        if (projectList.value.length > 1) {
          buildMenuTree(res.body.menuList);
          openProjectModal();
        } else {
          router.replace({ name: 'CommonCode' });
        }
      }
    } else {
      throw res;
    }
  } catch (error) {
    newToast(error.header.message, 'error');
  } finally {
    loading.value = false;
  }
};

// 메뉴 트리구조 생성
const buildMenuTree = (res) => {
  const result = res.reduce((acc, obj) => {
    let project = acc.find((p) => p.projectCode === obj.projectCode);

    if (!project) {
      project = {
        projectCode: obj.projectCode,
        projectName: obj.projectName,
        mainMenu: []
      };
      acc.push(project);
    }

    if (obj.level === '1') {
      project.mainMenu.push({
        ...obj,
        subMenu: []
      });
    } else if (obj.level === '2') {
      const mainMenu = project.mainMenu.find(
        (item) => item.menuCode === obj.parentMenuCode
      );

      if (mainMenu) {
        mainMenu.subMenu.push(obj);
      }
    }

    return acc;
  }, []);

  menus.value = result;
  /*
  menus.value = [
    {
      projectCode: '1',
      homeUrl: '/system/projects',
      mainMenu: [
        {
          mainMenuCd: 'SYSTEM',
          mainMenuNm: '시스템',
          subMenu: [
            {
              menuCd: 1,
              menuNm: '프로젝트관리',
              path: '/system/projects'
            },
            {
              menuCd: 2,
              menuNm: '사용자관리',
              path: '/system/users'
            },
            {
              menuCd: 3,
              menuNm: '메뉴관리',
              path: '/system/menus'
            },
            {
              menuCd: 4,
              menuNm: '권한관리'
            }
          ]
        }
      ]
    },
    {
      projectCode: '2',
      homeUrl: '/system/projects',
      mainMenu: [
        {
          mainMenuCd: 'B1',
          mainMenuNm: '기초 관리',
          subMenu: [
            {
              menuCd: 1,
              menuNm: '프로젝트관리',
              path: '/system/projects'
            },
            {
              menuCd: 2,
              menuNm: '사용자관리',
              path: '/system/users'
            },
            {
              menuCd: 3,
              menuNm: '메뉴관리',
              path: '/system/menus'
            },
            {
              menuCd: 4,
              menuNm: '권한관리'
            }
          ]
        },
        {
          mainMenuCd: 'B2',
          mainMenuNm: '기초 관리2',
          subMenu: [
            {
              menuCd: 1,
              menuNm: '프로젝트관리',
              path: '/system/projects2'
            }
          ]
        }
      ]
    }
  ];
  */
};

// 저장된 로그인 정보 가져오기
const setLoginInfo = () => {
  const info = JSON.parse(localStorage.getItem('info'));

  if (!info) return;
  else {
    loginInfoSaved.value = true;
    businessNumber.value = info.businessNumber;
    id.value = info.id;
  }

  return;
};

onMounted(() => {
  setLoginInfo();
});
</script>
