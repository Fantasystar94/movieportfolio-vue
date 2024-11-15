<template>
    <section class="mainSection">
      <!-- 로딩 중일 때 IsLoading 컴포넌트 표시 -->
      <IsLoading v-if="loading" />
  
      <!-- 로딩이 끝나면 영화 목록 표시 -->
      <div v-else class="movieWrap">
        <div v-for="item in boxOffice" :key="item.movieCode" class="movieitem"  @click="goToDetail(item)">
          <div class="posterWarp">
            <img class="moviePoster" :src="item.imageUrl" :alt="item.movieName" />
            <span class="rate">{{ item.rank }}</span>
          </div>
          <div class="movieArticles">
            <span class="title">{{ item.movieName }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import IsLoading from '@/components/IsLoading.vue';
  import getBoxofficeApi from '@/api/getBoxofficeApi';
  
  export default {
    name: 'BoxOffice',
    components: {
      IsLoading,
    },
    setup() {
      const boxOffice = ref([]);
      const loading = ref(false);
      const router = useRouter();
      
      onMounted(async () => {
        try {
          loading.value = true;  // 로딩 시작
          const { data, isLoading } = await getBoxofficeApi();
          boxOffice.value = data;
          console.log(data)
          loading.value = isLoading;  // 로딩 종료
        } catch (error) {
          console.error('API 호출 오류:', error);
          loading.value = false;
        }
      });
  
    const goToDetail = (item) => {
      router.push({
        name: 'MovieDetail',
        params: { id: item.movieCode },  // movieCode만으로 이동
        query: { item: JSON.stringify(item) }
      });
    };

    return {
        boxOffice,
        loading,
        goToDetail
      };
    },
  };
  
  </script>
  <style>
  
.mainSection{
    width:1400px;
    margin:0 auto;
}
.movieWrap {
    display:grid;
    grid-template-columns:repeat(5,auto);
}

.movieWrap .movieitem {
    width:213px;
    min-height:305px;
    margin:20px;
    border-radius:20px;
    overflow:hidden;
    position:relative;
    cursor: pointer;
}

.movieWrap .movieitem .posterWarp{
    max-height:300px;
    position:relative;
    overflow:hidden;
}
.movieWrap .movieitem .posterWarp::after {
    content: '';
    display: block;
    width: 100%;
    height: 80px; 
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)); 
    position: absolute;
    left: 0;
    bottom: 0;
}
.title {
    font-size: 20px;
    font-weight: bold;
}
.movieWrap .movieitem .posterWarp .rate{
    position:absolute;
    font-size:60px;
    left:0;
    bottom:5px;
    z-index:2;
    font-style:italic;
    line-height:1em;
    color:white;
}
.date {
    color: gray;
}
.movieArticles{display:flex;flex-direction:column;position:relative;margin-top:10px;}


@media (max-width: 749px) { 
    .mainSection{
        width:auto;
        max-width:750px;
        margin:0 auto;
    }
    .movieWrap {
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:center;
      min-width:350px;
    }
    .movieWrap .movieitem{
        width:150px;
        margin:8px;
        min-height:270px;
    }
    .movieWrap .movieitem .posterWarp{
        max-height:200px;
        position:relative;
        overflow:hidden;
    }
    .movieWrap .movieitem .posterWarp>img{
        width:100%;
        height:auto;
        display:block;
    }
}
</style>