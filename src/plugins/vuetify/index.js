import '@mdi/font/css/materialdesignicons.css';
import '@/styles/main.scss';

import theme from '@/plugins/vuetify/config/theme';
import defaults from '@/plugins/vuetify/config/defaults';
import { createVuetify } from 'vuetify';
import { ko } from 'vuetify/locale';

export default createVuetify({
  theme,
  defaults,
  locale: {
    locale: 'ko',
    messages: { ko }
  }
});
