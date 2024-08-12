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
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }]
  }
};
