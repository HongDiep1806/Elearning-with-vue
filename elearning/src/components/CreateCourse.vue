<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My E-Learning</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
              <v-list-item-content>
                <v-list-item-title style="color:rgb(16, 102, 152) ; font-weight: bolder;">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-container>
            <h2 class="welcome">Let's create a new course</h2>
            <v-form @submit.prevent style="width: 40%; margin: 0 auto; border-style: inherit;">
              <v-text-field v-model="courseName" label="Course name" style="height: 20%;"></v-text-field>
              <v-autocomplete label="Select teacher" :items="teachers" item-title="Name" item-value="id"
                v-model="selectedTeacherID"></v-autocomplete>
              <v-btn class="mt-2" type="submit" block @click="createCourse" style="background-color: green; color: white;">Create</v-btn>
            </v-form>
          </v-container>

        </v-main>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { Teacher } from '@/types/Teacher';
import axios from 'axios';

// Define refs for reactive data
const router = useRouter();
const route = useRoute();
const drawer = ref(false);
const courseName = ref('');

// Manage navigation actions
const navigateToHomePage = () => {
  router.push({ name: 'home' });
};

const navigateToCourselist = () => {
  router.push({ name: 'courselist' });
};

const items = ref([
  { title: 'Home', action: navigateToHomePage },
  { title: 'Course List', action: navigateToCourselist },
]);

const teachers = ref<Teacher[]>([]);
const getTeacherList = async () => {
  try {
    const response = await axios.get<Teacher[]>('https://localhost:7117/api/Teacher');
    teachers.value = response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
  }
}

const selectedTeacherID = ref('');
const createCourse = async () => {
  try {
    await axios.post('https://localhost:7117/api/Course', {
      name: courseName.value,
      teacherID: selectedTeacherID.value
    });
    navigateToCourselist();
  } catch (error) {
    console.error("There was an error creating the data:", error);
  }
}
// Call the parse function when the component mounts
onMounted(async () => {
  await getTeacherList();
});
</script>
<style>
.welcome {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: xx-large;
  margin: 50px;
  color: rgb(16, 102, 152);

}
</style>