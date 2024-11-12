import axios from "axios";

const getBestMovieApi =async(movieArray)=>{
    console.log(movieArray[0])

const serviceKey = process.env.VUE_APP_KOREAFILM_KEY;
const baseUrl = process.env.VUE_APP_KOREAFILM_URL;

    const fetchData = async (item) => {
        try {
            const res = await axios.get(baseUrl, {
                params: {
                    ServiceKey: serviceKey,
                    title: item.title,
                    listCount: 1,
                    releaseDts: item.releaseDate,
                    director: item.director,
                },
            });
            return res.data.Data[0].Result;
        } catch (err) {
            // setError('데이터 통신중 오류');
            console.error(err);
        } finally {
            // setLoading(false);
        }
    };
    const setAllMovie = async () => {
        const promiseData = movieArray.map(item => fetchData(item));
        const movieData = await Promise.all(promiseData);
        return movieData.filter(Boolean);
    };
    return setAllMovie();
}
export default getBestMovieApi