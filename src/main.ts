import { createApp } from 'vue';
import { createPinia } from "pinia";
import '@/style/index.css';
import '@/style/tailwind.css';
import App from '@/App.vue';
import router from '@/router';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app');
