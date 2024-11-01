<template>
    <v-card class="mx-auto" max-width="400" style="margin: 10px;box-shadow: inset;">
      <v-img class="align-end text-white" height="200" width="400" :src="randomImage" cover>
        <!-- <v-card-title >{{ props.course.name }}</v-card-title> -->
      </v-img>
  
      <v-card-subtitle class="pt-4"  style="color: black;font-weight: bolder;"> {{ props.course.name}} </v-card-subtitle>
  
      <v-card-text>
        <div>The course is taught by Teacher: {{ getTeacherName(props.course.teacherID)}}</div>
      </v-card-text>
  
      <v-card-actions >
        <v-btn @click.stop="deleteCourse" style="background-color: red; color: white;" >Delete</v-btn>
        <v-btn @click.stop="openUpdateDialog" style="background-color: rgb(30, 144, 255);color: white;">Update</v-btn>
        <UpdateDialog 
                        @close-dialog="handleCloseEvent" 
                        @update-table="props.fetchData"
                        :open="openUpdate" 
                        :course-name="props.course.name"
                        :courseID="props.course.id"
                        :teacherID="props.course.teacherID"
                        :fetch-data="props.fetchData" 
                        :teachers="props.teachers"
                    />
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, onMounted } from 'vue';
  import type { Course } from '../types/Course';
  import type { Teacher } from '../types/Teacher';
  import axios from 'axios';
  import UpdateDialog from './UpdateDialog.vue';
  
  const props = defineProps<{
    course: Course;
    teachers: Teacher[];
    fetchData: () => void
  }>();

  const getTeacherName = (id: string) => {
    const teacher = props.teachers.find((teacher) => teacher.id === id);
    if (teacher) {
        return teacher.Name;
    }
    return '';
}

const openUpdate = ref(false);
const deleteCourse = async () => {
    try {
        const trimmedId = props.course.id.trim();
        await axios.delete('https://localhost:7117/api/Course/', {
            data: { id: trimmedId }
        });
        await props.fetchData();
    } catch (error) {
        console.error("There was an error deleting the data:", error);
    }
};

const openUpdateDialog = () => {
    openUpdate.value = true;
};

const handleCloseEvent = () => {
    openUpdate.value = false;
};

const randomImage = ref('');
const getRandomImage = () => {
  try {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    randomImage.value = require(`../assets/classroom${randomNum}.jpg`);
  } catch (error) {
    console.error('There was an error fetching the random image:', error);
  }
};
  
  onMounted(() => {
    getTeacherName(props.course.teacherID);
    getRandomImage();
  });
  </script>
  
  <style scoped>
.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
} 
  </style>
  