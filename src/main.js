import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // router 임포트

// 애플리케이션에 router를 사용한 후 mount 해야 합니다
const app = createApp(App);
app.use(router);
app.mount('#app');