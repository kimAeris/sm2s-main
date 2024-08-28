import '@mdi/font/css/materialdesignicons.css';
import '@/styles/main.scss';

import { ko } from 'vuetify/locale';
import 'dayjs/locale/ko';
import DayJsAdapter from '@date-io/dayjs';

import theme from '@/plugins/vuetify/config/theme';
import defaults from '@/plugins/vuetify/config/defaults';
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme,
  defaults,
  date: {
    // locale: {
    //   en: 'ko'
    // },
    adapter: DayJsAdapter,
    formats: {
      isoFullDate: 'YYYY-MM-DD',
      isoYearAndMonth: 'YYYY-MM',
      isoFullDateTime: 'YYYY-MM-DD HH:MM',
      isoDateWithWeekday: 'MM-DD (ddd)'
    }
  },
  locale: {
    locale: 'ko',
    messages: { ko }
  }
});
