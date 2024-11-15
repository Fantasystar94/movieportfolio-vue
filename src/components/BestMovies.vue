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

    <!-- Modal Component -->
    <ModalView 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false"
      :movieInfo="selectedItem"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import getBestMovieApi from '@/api/getBestMovieApi';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import ModalView from '@/components/ModalView.vue';

export default {
  name: 'BestMovies',
  components: {
    Swiper,
    SwiperSlide,
    ModalView
  },
  props: {
    movieArray: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const title = ref(props.movieArray.title);
    const movies = ref([]);
    const isLoading = ref(true);
    const isModalOpen = ref(false); // 모달 상태 관리
    const selectedItem = ref(null); // 선택한 영화 데이터 저장

    const breakpoints = ref({
      750: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 10
      }
    });

    onMounted(async () => {
      try {
        const data = await getBestMovieApi(props.movieArray.array);
        movies.value = data;
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        isLoading.value = false;
      }
    });

    const openModal = (item) => {
      selectedItem.value = item;
      isModalOpen.value = true;
    };

    const formatDate = (date) => {
      return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    };

    return {
      title,
      movies,
      isLoading,
      Swiper,
      SwiperSlide,
      breakpoints,
      isModalOpen,
      selectedItem,
      openModal,
      formatDate
    };
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
  .swiperComponent{width:auto;max-width:750px;margin:0 auto;padding:0 10px;}
  .swiper-slide.swiperItem .swiperImg{max-height:230px;}
  .swiper-slide.swiperItem .swiperImg>img{width:100%;height:auto;}
}
</style>
  