import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 初始化css
import '@/assets/css/base.scss'


require("./mock/mock")

const app = createApp(App);


import * as echarts from 'echarts';

app.config.globalProperties.$echarts = echarts;

app.use(store).use(router).use(ElementPlus).mount('#app');

