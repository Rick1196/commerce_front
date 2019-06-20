import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/Home'
import Ciudades from '@/components/Ciudades'
import Users from '@/components/Users'
import Provs from '@/components/Provs'
import Prods from '@/components/Prods'
import Cats from '@/components/Cats'
import Prods_cat from '@/components/Prods_cat'
import Prods_prov from '@/components/Prods_prov'
import Sistema from '@/components/Sistema'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ciudades',
      name: 'Ciudades',
      component: Ciudades
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/provs',
      name: 'Provs',
      component: Provs
    },
    {
      path: '/cats',
      name: 'Cats',
      component: Cats
    },
    {
      path: '/prods',
      name: 'Prods',
      component: Prods
    },
    {
      path: '/sistema',
      name: 'Sistema',
      component: Sistema
    },
    {
      path: '/prods_cat/:id',
      name: 'Prods_cat',
      component: Prods_cat,
      props: true,
    },
    {
      path: '/prods_prov/:id',
      name: 'Prods_prov',
      component: Prods_prov,
      props: true,
    },
  ]
})
