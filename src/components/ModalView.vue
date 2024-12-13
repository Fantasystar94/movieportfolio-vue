<template>
    <div v-if="isOpen" class="modalOverlay" @click="onClose">
      <div class="modalContent" @click.stop>
        <button class="closeButton" @click="onClose">
          ×
        </button>
        <div class="mainBox">
          <img
            :src="movieInfo.posters.split('|')[0] || 'https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img'"
            alt="Movie Poster"
            class="poster"
          />
          <div class="modal-mainTitleWrap">
            <h3 class="title">{{ movieInfo.title.replace(/!HS|!HE/g, '').trim() }}</h3>
            <h4 class="titleEn">{{ movieInfo.titleEng }}</h4>
            <span>{{ movieInfo.directors.director[0].directorNm.replace(/!HS|!HE/g, '').trim() }} 감독 작품</span>
            <span class="genre">{{ movieInfo.genre }} {{ movieInfo.keywords }}</span>
            <span class="rating">{{ movieInfo.rating }}</span>
            <span class="actors">{{ movieInfo.actors.actor[0].actorNm }} 주연</span>
            <a
              :href="'https://www.youtube.com/results?search_query=' + encodeURIComponent('영화 ' + movieInfo.title.replace(/!HS|!HE/g, '').trim())"
              target="_blank"
              rel="noopener noreferrer"
              class="youtubeLink"
            >
              유튜브 영상 보기
            </a>
          </div>
        </div>
        <p class="plot">
          {{ movieInfo.plots.plot[0].plotText }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalView',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      onClose: {
        type: Function,
        required: true,
      },
      movieInfo: {
        type: Object,
        required: true,
      },
    },
    watch: {
      isOpen(newVal) {
        if (newVal) {
          document.body.style.overflow = 'hidden'; // 모달 열기 시 body 스크롤 방지
        } else {
          document.body.style.overflow = ''; // 모달 닫기 시 body 스크롤 복구
        }
      }
    }
  };
  </script>
  
  <style scoped>
.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 모달을 최상위로 */
    overflow: hidden;
    
}
.modalOverlay *{
    color:#fff;
}
.modalOverlay::after{
    content:'';
    display:block;
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
}

.modalContent {
    background-color: #000;
    border-radius: 8px;
    width: 90%; /* 기본 너비를 90%로 설정 */
    max-width: 600px; /* 최대 너비 설정 */
    
    padding: 50px 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden; /* 내부 내용이 넘칠 경우 숨기기 */
    z-index: 3;
}

.closeButton {
    background: none;
    border: none;
    font-size: 40px;
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    color:#fff;
}

.mainBox {
    display: flex;
    width:auto;
    align-items: flex-start; /* 이미지와 제목을 위쪽으로 정렬 */
}

.poster {
    max-width: 213px; /* 포스터의 고정 너비 */
    height: auto; /* 비율 유지 */
    margin-right: 20px; /* 이미지와 텍스트 사이 간격 */
}

.modal-mainTitleWrap {
    flex-grow: 1; /* 남은 공간을 차지하도록 */
    display:flex;
    flex-direction:column;
    text-align:left;
    gap:5px 0;
}
.modal-mainTitleWrap a{margin-top:20px;display:inline-block;width:150px;height: 35px;background-color:#B00712;border-radius:10px;text-align:center;line-height:35px;text-decoration:none;color:#fff;}
.modalContent>.title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
}

.titleEn {
    font-size: 16px;
    color: gray; /* 영어 제목 색상 조정 */
}

.plot {
    margin-top: 20px; /* 플롯과 다른 요소들 간격 */
    font-size: 14px; /* 플롯 텍스트 크기 */
    line-height: 1.5; /* 줄 간격 조정 */
    text-align:left;
}
.genre{
    font-size:12px;
}
.youtubeLink {
    display: inline-block; /* 링크 스타일 */
    margin-top: 10px; /* 위쪽 마진 */
    color: #fff; /* 링크 색상 */
    text-decoration: none; /* 밑줄 제거 */
}

.youtubeLink:hover {
    text-decoration:none; /* 호버 시 밑줄 추가 */
}

/* 반응형 디자인 */
@media (max-width: 749px) {
    .modalContent {
        width: 95%; /* 모바일에서 너비를 95%로 조정 */
        max-height:580px;
    }
    .genre{
        font-size:10px;
    }
    .poster {
        width: 120px; /* 모바일에서 포스터 크기 조정 */
    }

    .title {
        font-size: 18px; /* 제목 크기 조정 */
    }

    .titleEn {
        font-size: 14px; /* 영어 제목 크기 조정 */
    }
    .rating,.actors{font-size:14px;}
    .plot {
        font-size: 12px; /* 플롯 텍스트 크기 조정 */
        height:120px;
        overflow:scroll;
    }
}
  </style>