import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from '@/components/HomePage.vue'
import CourseList from '@/components/CourseList.vue'
import CreateCourse from '@/components/CreateCourse.vue'
import type { Teacher } from '@/types/Teacher';
import LoginPerson from '@/components/LoginPerson.vue'
import StudentList from '@/components/StudentList.vue'
import CreateAccount from '@/components/CreateAccount.vue'
import CourseDetail from '@/components/CourseDetail.vue'
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
  },
  {
    path: '/studentlist',
    name: 'studentlist',
    component: StudentList
  },
  {
    path: '/createAccount',
    name: 'createAccount',
    component: CreateAccount  
  },
  {
    path: '/course/:courseID', 
    name: 'courseDetail', 
    component: CourseDetail 
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
