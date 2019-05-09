import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/index/index'
import Login from '@/components/login'
import To_Login from '@/components/login1'
import Exam from '@/components/exams/index'
import Self from '@/components/self/index'
import Back from '@/components/back/index'
import detail from '@/components/index/detail'
import register from '@/components/register'

import newExam from '@/components/exams/new'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
        path: '/To_Login',
        name: 'To_Login',
        component: To_Login
      },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      children: [
        {
          path: 'new',
          component: newExam
        },
      ]
    },
    {
      path: '/self',
      name: 'self',
      component: Self
    },
    {
      path: '/back',
      name: 'back',
      component: Back
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
        path:'/register',
        name:'register',
        component:register
      }

  ]
});
