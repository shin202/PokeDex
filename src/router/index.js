import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon-detail/:id',
    name: 'PokemonDetail',
    component: () => import(/* webpackChunkName: "pokemon_detail" */ "../components/pokemon_data/PokemonDetails.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
