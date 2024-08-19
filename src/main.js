import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerPlugins } from '@/plugins';

import ContentHeader from './components/ContentHeader.vue';
import ContentBody from './components/ContentBody.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
registerPlugins(app);
app.component('ContentHeader', ContentHeader);
app.component('ContentBody', ContentBody);

app.use(createPinia());
app.use(router);
app.mount('#app');
