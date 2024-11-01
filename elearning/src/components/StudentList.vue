<template>
    <v-container>
        <v-card>
            <v-layout>
                <v-app-bar color="light-blue" prominent>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                    <v-toolbar-title>My E-Leaning</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <template v-if="$vuetify.display.mdAndUp">
                        <v-btn icon="mdi-magnify" variant="text"></v-btn>
                        <v-btn icon="mdi-filter" variant="text"></v-btn>
                    </template>

                    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
                </v-app-bar>

                <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined"
                    temporary>
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
                            <v-list-item-content>
                                <v-list-item-title style="color:rgb(16, 102, 152) ; font-weight: bolder;">{{
                                    item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="margin-top: 10px;height: 100%;">
                    <v-container style="display: flex; justify-content: flex-end;align-items: flex-start;">
                        <v-btn icon="mdi-plus" size="small"
                            style="background-color: rgb(30, 144, 255); color: aliceblue;"
                        ></v-btn>
                    </v-container>
                    <v-table>
                        <thead style="background-color: rgb(16, 102, 152); color: white;">
                            <tr>
                                <th class="text-left">
                                    IRN
                                </th>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Date Of Birth
                                </th>
                                <th class="text-left">
                                    Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in students" :key="item.id">
                                <td>{{ item.IRN }}</td>
                                <td>{{ item.Name }}</td>
                                <td>{{ item.DOB }}</td>
                                <td>{{ item.Address }}</td>

                            </tr>
                        </tbody>
                    </v-table>
                </v-main>
            </v-layout>
        </v-card>
    </v-container>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Student } from '@/types/Student';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CourseCard from './CourseCard.vue';
import type { Course } from '../types/Course.ts';
import type { Teacher } from '@/types/Teacher';

const router = useRouter();

const navigateToHomePage = () => {
    router.push({ name: 'home' });
};

const navigateToCourselist = () => {
    router.push({ name: 'courselist' });
};

const navigateToStudentlist = () => {
    router.push({ name: 'studentlist' });
};


const drawer = ref(false);
const items = ref([
    { title: 'Home', action: navigateToHomePage },
    { title: 'Course List', action: navigateToCourselist },
    { title: 'Students', action: navigateToStudentlist }

]);

const students = ref<Student[]>([])
const getStudents = async () => {
    const response = await axios.get('https://localhost:7117/api/Student')
    students.value = response.data
}
onMounted(async () => {
    await getStudents()
})


</script>