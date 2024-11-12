<template>
  <div class="swiperComponent">
    <h3 class="title">{{ title }}</h3>
    <swiper
     
      :spaceBetween="30"
      :breakpoints="breakpoints"
      :slidesPerView="5"
    >
      <swiper-slide
        v-for="(items, index) in movies"
        :key="index"
        @click="openModal(items[0])"
        class="swiperItem"
      >
        <div class="swiperImg">
          <img
            :src="items[0].posters.split('|')[0] || 'https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img'"
            :alt="items[0].title.replace(/!HS|!HE/g, '')"
          />
        </div>
        <h5>{{ items[0].title.replace(/!HS|!HE/g, '') }}</h5>
        <span>{{ formatDate(items[0].repRlsDate) }}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import getBestMovieApi from '@/api/getBestMovieApi';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  export default {
    
    name: 'BestMovies',
      components: {
      Swiper,
      SwiperSlide
    },
    props: {
      movieArray: {
        type: Array,
        required: true,
      }
    },
    setup(props) {
      const title = ref(props.movieArray.title);
      const movies = ref([]); // API 호출 후 받은 영화 데이터를 저장할 변수
      const isLoading = ref(true); // 로딩 상태를 관리

      const breakpoints = ref({
      750: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 5
      }
    });
      onMounted(async () => {
        try {
        const data = await getBestMovieApi(props.movieArray.array); // props.movieArray를 전달
        movies.value = data; // 받은 데이터를 movies에 저장
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        isLoading.value = false; // 로딩 완료
      }
    });
    return {
      title,
      movies,
      isLoading,
      Swiper,
      SwiperSlide,
      breakpoints
    };
  },
  methods: {
    openModal(item) {
      // 모달을 여는 로직
      console.log(item);
    },
    formatDate(date) {
      // 날짜 포맷팅 (yyyy-mm-dd 형태로)
      return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
  }
  };
  </script>
<style>
.swiperComponent{width:1400px;margin:0 auto;}
.swiperComponent .title{text-align:left;margin-bottom:20px;}
.swiper:first-of-type{margin-bottom:50px;}
.swiper-slide{width:auto;}
.swiper-slide.swiperItem{cursor:pointer;display:flex;flex-direction:column;gap:8px 0;overflow:hidden;display:flex;justify-content:center;;width: calc(25% - 20px);box-sizing:border-box;}
.swiper-slide.swiperItem .swiperImg{overflow:hidden;display:flex;justify-content:center;max-height:300px;}
.swiper-slide.swiperItem h5{font-size:16px;}
.swiper-slide.swiperItem span{color:gray;}
@media (max-width:749px) {
  .swiperComponent{width:auto;max-width:750px;margin:0 auto;}
}
</style>
  