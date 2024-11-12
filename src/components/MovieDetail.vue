<template>
    <section>
      <button class="backButton" @click="handleBack">←</button>
      <div class="mainBox">
        <img :src="localItem.imageUrl" alt="영화 포스터" />
        <div class="mainTitleWrap">
          <h3 class="title">{{ localItem.movieName }}</h3>
          <h4 class="titleEn">{{ localItem.titleEn }}</h4>
          <span>{{ localItem.director }} 감독 작품</span>
          <span>{{ localItem.genre }} {{ localItem.keywords }} | {{ localItem.rating }}</span>
          <span>{{ formattedActors }} 주연</span>
          <a
            :href="youtubeLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            유튜브 영상 보기
          </a>
        </div>
      </div>
      <p class="plot">
        {{ localItem.plots }}
      </p>
    </section>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    methods:{
      handleBack() {
      this.$router.push('/'); // 루트 경로로 이동
    },
    },
    name: 'MovieDetail',
    props: {
      item: {
        type: Object,
        required: true,
        default: () => ({
          movieName: '',
          movieCode: '',
          rank: '',
          date: '',
          audienceCount: '',
          imageUrl: '',
          titleEn: '',
          director: '',
          genre: '',
          keywords: '',
          rating: '',
          actors: [],
          plots: '',
        }),
      },
    },
    setup(props) {
      const localItem = ref({ ...props.item });
      const router = useRouter();
  
      // 라우트의 query에서 item을 가져와서 localItem에 설정
      onMounted(() => {
        const queryItem = router.currentRoute.value.query.item;
        if (queryItem) {
          localItem.value = JSON.parse(queryItem);
        }
        console.log(localItem.value)
      });
  
      const youtubeLink = computed(() => {
        return `https://www.youtube.com/results?search_query=${encodeURIComponent(localItem.value.movieName)}`;
      });
  
      const formattedActors = computed(() => {
        return localItem.value.actors.join(', ');
      });
  
      return {
        youtubeLink,
        formattedActors,
        localItem,
      };
    },
    
  };
  </script>


<style>
section{width:960px;margin:120px auto;}
.mainBox{display:flex;flex-direction:row;align-items:flex-start;justify-content:flex-start;gap:0 50px;font-weight:500;}
.mainTitleWrap{display:flex;flex-direction:column;text-align:left;margin-top:30px;}
.mainTitleWrap h3,h4{font-weight:500;}
.mainTitleWrap .title{font-size:25px;}
.mainTitleWrap .titleEn{font-size:20px;margin-bottom:40px;position:relative;}
.mainTitleWrap .titleEn::after{content:'';display:block;position:absolute;left: 0;bottom:-20px;width: 100%;height: 1px;background-color:#b1b1b1;}
.mainTitleWrap a{margin-top:20px;display:inline-block;width:150px;height: 35px;background-color:#B00712;border-radius:10px;text-align:center;line-height:35px;text-decoration:none;color:#fff;}
.plot{margin-top:50px;line-height: 1.8;margin-bottom: 1em;text-align:left;}

.backButton {
    width: 40px; 
    height: 40px; 
    background-color: #333; 
    color: white;
    border: none;
    border-radius: 5px; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom:20px; 
    transition: background-color 0.3s;
}

.backButton:hover {
    background-color: #555; 
}

@media (max-width: 749px) {
    section{max-width:750px;width:auto;padding:0 10px;margin:50px 0;}
    .mainBox{flex-direction:column;;}
}
</style>