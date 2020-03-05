export const mutations = {

    changeMovieData(state,result){
  
        state.movieData = result
        state.movieData.data.subjects.push(...result.data.subjects);
        

    }
}