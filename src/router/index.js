import { createRouter, createWebHistory } from 'vue-router';
import MovieDetail from '../components/MovieDetail.vue';

const routes = [
  {
    path: '/MovieDetail/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;