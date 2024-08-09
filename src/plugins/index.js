import { loadFonts } from '@/plugins/webfontloader';
import vuetify from '@/plugins/vuetify';

export const registerPlugins = (app) => {
  loadFonts();
  app.use(vuetify);
};
