<template>
    <v-container style="width: 100%;">
        <v-card>
            <v-layout>
                <v-app-bar color="light-blue" prominent style="width: 100%;">
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                    <v-toolbar-title>
                        My E-learning || {{ thisCourse?.name }}
                    </v-toolbar-title>

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
                        <v-list-item v-for="(item, index) in navItems" :key="index" @click="item.action">
                            <v-list-item-content>
                                <v-list-item-title style="color:rgb(16, 102, 152); font-weight: bolder;">
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main style="height: 100%;">
                    <v-app>
                        <v-card>
                            <v-tabs v-model="tab" align-tabs="center" stacked>
                                <v-tab value="tab-1">Stream</v-tab>
                                <v-tab value="tab-2">Classwork</v-tab>
                                <v-tab value="tab-3">People</v-tab>
                            </v-tabs>

                            <v-tabs-window v-model="tab">
                                <v-tabs-window-item v-for="i in 3" :key="i" :value="'tab-' + i">
                                    <v-card v-if="i === 1">
                                        <v-sheet elevation="2" height="400px" width="100%"
                                            class="background-image-sheet">
                                            <v-container>
                                                <v-card-title class="white--text">Card with Background
                                                    Image</v-card-title>
                                                <v-card-text class="white--text">This sheet has a background
                                                    image.</v-card-text>
                                            </v-container>
                                        </v-sheet>
                                    </v-card>
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card>
                    </v-app>
                </v-main>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import type { Course } from '@/types/Course';
import { ref, withDefaults, defineProps, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
const props = withDefaults(defineProps<{
    courses: Course[]
}>(), {

});

const router = useRouter();
const route = useRoute();
const thisCourse = ref<Course>()

// Access courseID from route params
const courseID = ref(route.params.courseID || 'null');
const courses = ref<Course[]>([]);
const fetchCourses = async () => {
    try {
        const response = await axios.get('https://localhost:7117/api/Course');
        courses.value = response.data;
    } catch (error) {
        console.error("There was an error fetching the data:", error);
    }
}
const findCourse = () => {
    thisCourse.value = courses.value.find((course) => course.id == courseID.value);
}

// Navigation actions
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


// Navigation items for drawer
const navItems = ref([
    { title: 'Home', action: navigateToHomePage },
    { title: 'Course List', action: navigateToCourselist },
    { title: 'Students', action: navigateToStudentlist }
]);

// Tab state and text
const text = ref('Content for the tab goes here.');
const tab = ref('tab-1');
onMounted(async () => {
    await fetchCourses();
    await findCourse();

})
</script>

<style>
.background-image-sheet {
  background-image: url('../assets/classroom10.jpg');
  background-size: cover; /* Ensures the image covers the entire area */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
}
</style>
