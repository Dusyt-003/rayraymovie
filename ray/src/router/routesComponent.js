class RoutesComponent{

registerComponent(){
    return import('../views/Register.vue')
}
loginComponent(){
    return import('../views/Login.vue')
}
indexComponent(){
    return import('../views/Index.vue')
}
homeComponent(){
    return import('../views/indexComponent/Home.vue')
}
buyComponent(){
    return import('../views/indexComponent/Buy.vue')
}
findComponent(){
    return import('../views/indexComponent/Find.vue')
}
videoComponent(){
    return import('../views/indexComponent/Video.vue')
}
mineComponent(){
    return import('../views/indexComponent/Mine.vue')
}
movieComponent(){
    return import('../views/buyComponent/Movie.vue')
}
cinemaComponent(){
    return import('../views/buyComponent/Cinema.vue')
}
buyComponent(){
    return import('../views/indexComponent/Buy.vue')
}
movieDetailComponent() {
    return import('../views/MovieDetail.vue')
  }

}

export default new RoutesComponent()