import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from '@/components/HomePage.vue'
import CourseList from '@/components/CourseList.vue'
import CreateCourse from '@/components/CreateCourse.vue'
import type { Teacher } from '@/types/Teacher';
import LoginPerson from '@/components/LoginPerson.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPerson
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/courselist',
    name: 'courselist',
    component: CourseList
  },
  {
    path: '/createCourse',
    name: 'createCourse',
    component: CreateCourse,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
