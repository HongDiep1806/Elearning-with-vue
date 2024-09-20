<template>
    <v-dialog v-model="isModelOpen" max-width="500">
        <v-card title="Update" style="font-size: bold;">
            <v-text-field label="Course ID" :model-value="props.courseID" name="id" disabled></v-text-field>
            <v-text-field label="Course Name" v-model="editedCourseName" name="name"></v-text-field>
            <v-autocomplete label="Select teacher" :items="props.teachers" item-title="Name" item-value="id"
                v-model="editedTeacherID">
            </v-autocomplete> 
            <v-card-actions>
                <v-btn @click="updateCourse"
                    style="background-color: green; color: white; border-radius: 5px; padding: 10px;">
                    Update
                </v-btn>
                <v-btn text="Close" @click="closeDialog"
                    style="background-color: red; color: white; border-radius: 5px; padding: 10px;">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, computed, defineEmits, watch } from 'vue';
import axios from 'axios';
import type { Teacher } from '@/types/Teacher';

const props = withDefaults(defineProps<{
    open: boolean,
    courseName: string,
    courseID: string,
    teacherID: string,
    teachers: Teacher[],
    fetchData: () => void
}>(), {
    open: false
});


// Local state for the edited course name
const editedCourseName = ref(props.courseName);
const editedTeacherID = ref(props.teacherID);

const emit = defineEmits<{
    (e: 'closeDialog'): void,
    (e: 'updateTable'): void
}>();

const isModelOpen = computed(() => props.open);

watch(() => props.courseName, (newValue) => {
    editedCourseName.value = newValue;
});

const updateCourse = async () => {
    try {
        const trimmedId = props.courseID.trim();
        if (!trimmedId || !editedCourseName.value || !props.teacherID) {
            alert('Please fill in all fields.');
            return;
        }

        const response = await axios.put('https://localhost:7117/api/Course/', {
            id: trimmedId,
            name: editedCourseName.value,
            teacherID: editedTeacherID.value
        });

        console.log(response.data);
    } catch (error) {
        console.error("There was an error updating the data:", error);
        alert('An error occurred while updating the course. Please try again later.');
    }
    emit('closeDialog');
    emit('updateTable');
};

const closeDialog = () => {
    emit('closeDialog');
};
</script>

<style scoped>
input {
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
}
</style>