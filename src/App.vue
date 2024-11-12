<template>

    <!-- 기본 페이지 (메인 페이지)에서는 BoxOffice와 BestMovies가 보이도록 -->
    <BoxOffice v-if="!isMovieDetailPage" />
    <BestMovies v-if="!isMovieDetailPage" :movieArray="koreaMovies" />
    <BestMovies v-if="!isMovieDetailPage" :movieArray="classicMovies" />
    
    <!-- MovieDetail 페이지로 이동하면 router-view에서 MovieDetail만 보이게 -->
    <router-view v-if="isMovieDetailPage" />
    <FooterView/>

</template>

<script>
// import { computed } from 'vue';
import BoxOffice from './components/BoxOffice.vue';
import BestMovies from './components/BestMovies.vue';
import { koreaMovies, classicMovies } from './util/movieArray.js';
import FooterView from './components/FooterView.vue';
export default {
  name: 'App',
  components: {
    BoxOffice,
    BestMovies,
    FooterView
  },
  data() {
    return {
      koreaMovies: koreaMovies,
      classicMovies: classicMovies
    };
  },
  computed: {
    isMovieDetailPage() {
      // 현재 라우트가 MovieDetail일 때만 true로 설정
      return this.$route.name === 'MovieDetail';
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width:1400px;
}
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
@media (max-width: 749px) {
  #app{max-width:750px;width:100%;}
}
</style>