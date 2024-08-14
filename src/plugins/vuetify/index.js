import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/main.scss';
import theme from '@/plugins/vuetify/config/theme';
import { createVuetify } from 'vuetify';
import { ko } from 'vuetify/locale';

export default createVuetify({
  theme,
  locale: {
    locale: 'ko',
    messages: { ko }
  }
});
