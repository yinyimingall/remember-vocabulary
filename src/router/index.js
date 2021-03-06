import Vue from 'vue'
import Router from 'vue-router'
import New from '@/views/new'
import About from '@/views/about'
import Home from '@/views/home'
import All from '@/views/all'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/all',
      name: 'AllList',
      component: All
    }
  ]
})
