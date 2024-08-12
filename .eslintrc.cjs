/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential', //  Vue 3 필수 ESLint 규칙
    'eslint:recommended', // 기본 ESLint 권장 규칙
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': 'off', // 줄 바꿈 스타일 규칙 비활성화
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }]
  }
};
