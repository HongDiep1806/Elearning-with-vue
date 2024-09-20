<template>
    <v-container>
        <v-card>
            <v-layout>
                <v-app-bar color="primary" prominent>
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
                                <v-list-item-title style="color:rgb(16, 102, 152) ; font-weight: bolder;">{{ item.title}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="margin-top: 10px">
                    <v-container style="display: flex; justify-content: flex-end;align-items: flex-start;">
                        <v-btn icon="mdi-plus" size="small"
                            style="background-color: rgb(30, 144, 255); color: aliceblue;"
                            @click="navigateToCreateCourse"></v-btn>
                    </v-container>
                    <div class="course-grid">
                        <CourseCard v-for="course in courses" :key="course.id" :course="course" :teachers="teachers"
                            :fetchData="fetchData"></CourseCard>
                    </div>
                </v-main>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CourseCard from './CourseCard.vue';
import type { Course } from '../types/Course.ts';
import axios from 'axios';
import { onMounted } from 'vue';
import type { Teacher } from '@/types/Teacher';

const router = useRouter();

const navigateToHomePage = () => {
    router.push({ name: 'home' });
};

const navigateToCourselist = () => {
    router.push({ name: 'courselist' });
};

const navigateToCreateCourse = () => {
    // Create a comma-separated string of teacher IDs
    router.push({
        name: 'createCourse',
    });
};



const drawer = ref(false);
const items = ref([
    { title: 'Home', action: navigateToHomePage },
    { title: 'Course List', action: navigateToCourselist },
]);

const courses = ref<Course[]>([]);
const fetchData = async () => {
    try {
        const response = await axios.get('https://localhost:7117/api/Course');
        courses.value = response.data;
    } catch (error) {
        console.error("There was an error fetching the data:", error);
    }
}
const teachers = ref<Teacher[]>([]);
const getTeacherList = async () => {
    try {
        const response = await axios.get<Teacher[]>('https://localhost:7117/api/Teacher');
        teachers.value = response.data;
    } catch (error) {
        console.error("There was an error fetching the data:", error);
    }
}

onMounted(async () => {
    await fetchData();
    await getTeacherList();
})
</script>

<style scoped>
.course-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    /* Adjust the gap between cards as needed */
}

.course-grid>* {
    flex: 1 1 calc(50% - 16px);
    /* Adjust the width and gap between cards */
    box-sizing: border-box;
}
</style>