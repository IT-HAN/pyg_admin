import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '../components/home/Home'
import Welcome from '../components/home/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/authority/Rights'
import Roles from '../components/authority/Roles'
import Categories from '../components/goods/Categories'
import Params from '../components/goods/Params'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', name: 'welcome', component: Welcome},
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/categories', name: 'categories', component: Categories},
        {path: '/params', name: 'params', component: Params}
      ]
    },
    {
      path: '/',
      redirect: Home
    }
  ]
})

// 添加守卫
router.beforeEach((to, from, next) => {
  // 如果现跳到登录页 就让他往下走 放行
  if (to.path === '/login') return next()
  // 如果现在未登录 (sessionStorage没有token) 拦截到登录
  if (!sessionStorage.getItem('token')) return next('/login')
  //  其他放行
  next()
})
export default router
