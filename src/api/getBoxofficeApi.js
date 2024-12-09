import axios from "axios";
import formatDateToYYYYMMDD from "@/util/formatDateToYYYYMMDD";

// 환경변수 설정
const apiKey = process.env.VUE_APP_KOBIS_KEY;
const imgKey = process.env.VUE_APP_KOREAFILM_KEY;
const kobisurl = process.env.VUE_APP_KOBIS_URL;
const koreaFilmUrl = process.env.VUE_APP_KOREAFILM_URL;

// 로컬스토리지 키
const STORAGE_KEY = 'boxOfficeData';
const STORAGE_TIME_KEY = 'boxOfficeDataTime';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;  // 24시간 (밀리초 단위)

const getBoxofficeApi = async () => {
    // 로컬스토리지에서 저장된 데이터와 시간 가져오기
    const storedData = localStorage.getItem(STORAGE_KEY);
    const storedTime = localStorage.getItem(STORAGE_TIME_KEY);
    const currentTime = new Date().getTime();

    // 로컬스토리지에 데이터가 있고, 24시간 이내에 저장된 데이터라면 사용
    if (storedData && storedTime && currentTime - storedTime < CACHE_EXPIRY) {
        return {
            data: JSON.parse(storedData),
            isLoading: false,
        };
    }

    try {
        // 박스오피스 데이터 호출
        const res = await axios.get(kobisurl, {
            params: {
                key: apiKey,
                targetDt: formatDateToYYYYMMDD(new Date()),  // 오늘 날짜로 요청
            },
        });

        // 영화 목록 처리
        const protoData = res.data.boxOfficeResult.dailyBoxOfficeList;

        const getDataDetail = await Promise.all(protoData.map(async (movie) => {
            try {
                const res = await axios.get(koreaFilmUrl, {
                    params: {
                        ServiceKey: imgKey,
                        title: movie.movieNm,
                        listCount: 1,
                        releaseDts:movie.openDt
                    }
                });

                const detail = res.data.Data[0].Result[0];
                console.log(detail)
                const actorNames = [];
                if (detail.actors && detail.actors.actor) {
                    const actors = detail.actors.actor;
                    const actorLimit = actors.length >= 3 ? 3 : actors.length;
                    for (let i = 0; i < actorLimit; i++) {
                        actorNames.push(actors[i].actorNm);
                    }
                }
                return {
                    movieName: movie.movieNm,
                    movieCode: movie.movieCd,
                    rank: movie.rank,
                    date: movie.openDt,
                    audienceCount: movie.audiAcc,
                    imageUrl: detail.posters.split('|')[0] || "https://via.placeholder.com/213x303.png?text=No+Image",
                    titleEn: detail.titleEng,
                    director: detail.directors.director[0].directorNm || "Unknown",
                    genre: detail.genre || "N/A",
                    keywords: detail.keywords || "N/A",
                    rating: detail.rating || "N/A",
                    actors: actorNames.length > 0 ? actorNames : ["N/A"],
                    plots: detail.plots.plot[0].plotText || "No plot Data"
                };
            } catch (error) {
                console.error("영화 상세 데이터 호출 중 오류 발생:", error);
                return null;
            }
        }));

        // 로컬스토리지에 데이터와 저장 시간을 함께 저장
        const dataToStore = getDataDetail.filter(movie => movie !== null);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
        localStorage.setItem(STORAGE_TIME_KEY, currentTime.toString());

        return {
            data: dataToStore,
            isLoading: false,
        };
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        return {
            data: [],
            isLoading: false,
        };
    }
};

export default getBoxofficeApi;